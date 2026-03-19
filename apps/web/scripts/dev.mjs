import net from "node:net";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function isPortFree(port, host = "0.0.0.0") {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));

    // Using exclusive avoids false positives on some platforms
    server.listen({ port, host, exclusive: true });
  });
}

async function findFreePort(startPort, { host = "0.0.0.0", maxAttempts = 50 } = {}) {
  for (let i = 0; i < maxAttempts; i += 1) {
    const port = startPort + i;
    // eslint-disable-next-line no-await-in-loop
    if (await isPortFree(port, host)) return port;
  }
  throw new Error(`No free port found starting at ${startPort} after ${maxAttempts} attempts`);
}

async function main() {
  const nextDir = path.join(process.cwd(), ".next");
  const serverDir = path.join(nextDir, "server");
  const routesManifest = path.join(nextDir, "routes-manifest.json");
  const pagesManifest = path.join(nextDir, "server", "pages-manifest.json");

  // Next sometimes leaves a partially written `.next` state when dev runs
  // were interrupted. When manifests/chunks are missing, runtime crashes can
  // happen and force manual restarts. We proactively reset the cache.
  try {
    if (fs.existsSync(serverDir)) {
      const manifestOk =
        fs.existsSync(routesManifest) && fs.existsSync(pagesManifest);

      if (!manifestOk) {
        fs.rmSync(nextDir, { recursive: true, force: true });
        process.stdout.write(
          "[web] cleaned corrupted .next cache (missing manifests)\n",
        );
      }
    }
  } catch (err) {
    console.warn("[web] .next auto-clean failed:", err);
  }

  const desiredRaw = process.env.PORT;
  const desired = Number.parseInt(desiredRaw ?? "3000", 10);
  const basePort = Number.isFinite(desired) ? desired : 3000;

  const host = process.env.HOST ?? "0.0.0.0";

  // Avoid racing the API default port (3001) when turbo starts both in parallel.
  // If the user explicitly sets PORT=3001, we honor it.
  const reservedPorts = desiredRaw ? [] : [3001];

  let port = basePort;
  for (let i = 0; i < 50; i += 1) {
    const candidate = basePort + i;
    if (reservedPorts.includes(candidate)) continue;
    // eslint-disable-next-line no-await-in-loop
    if (await isPortFree(candidate, host)) {
      port = candidate;
      break;
    }
  }

  const nextArgs = ["dev", "--port", String(port)];
  if (process.env.TURBO_HASH) {
    // no-op: keep env passthrough explicit when running under turbo
  }

  // Keep output readable under turborepo
  process.stdout.write(`[web] next dev on port ${port}\n`);

  const child = spawn("next", nextArgs, {
    stdio: "inherit",
    env: { ...process.env, PORT: String(port) },
    shell: process.platform === "win32",
  });

  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  // Keep failure visible in turbo logs
  console.error("[web] failed to start:", err);
  process.exit(1);
});

