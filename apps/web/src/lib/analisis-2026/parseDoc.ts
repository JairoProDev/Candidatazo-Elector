export type AnalisisSection = {
  title: string;
  id: string;
  content: string;
  searchText: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeRegExp(input: string) {
  // Used only for search helpers, but keeping it here avoids duplication.
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countQueryOccurrences(haystack: string, query: string) {
  if (!query.trim()) return 0;
  const regex = new RegExp(escapeRegExp(query), "ig");
  const matches = haystack.match(regex);
  return matches ? matches.length : 0;
}

function isHeadingCandidate(line: string) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.includes("\t")) return false; // tabular row

  // Heurística: títulos suelen ser frases relativamente cortas y sin puntuación final.
  if (trimmed.length < 12) return false;
  if (trimmed.length > 95) return false;
  if (/[.?!;:]$/.test(trimmed)) return false;

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 4) return false;

  return true;
}

function nextNonEmptyLine(lines: string[], index: number) {
  for (let i = index + 1; i < lines.length; i += 1) {
    const t = lines[i]?.trim() ?? "";
    if (t.length === 0) continue;
    return lines[i];
  }
  return null;
}

function looksLikeParagraphStart(line: string) {
  const t = line.trim();
  // Evita algunas líneas que suelen ser listas, encabezados de tablas o notas.
  if (!t) return false;
  if (t.startsWith("-") || t.startsWith("*")) return false;
  return true;
}

function isHeadingLine(lines: string[], index: number) {
  const line = lines[index] ?? "";
  const trimmed = line.trim();
  if (!trimmed) return false;

  if (!isHeadingCandidate(trimmed)) return false;

  const next = nextNonEmptyLine(lines, index);
  if (!next) return true;
  const nextTrim = next.trim();

  // Si la siguiente línea es "larga" y parece un párrafo, esto suele corresponder a un título.
  // (En el contenido actual, los títulos son mucho más cortos que los párrafos.)
  if (nextTrim.length < 45) return false;
  if (!looksLikeParagraphStart(nextTrim)) return false;

  return true;
}

export function parseAnalisis2026(raw: string): AnalisisSection[] {
  const lines = raw.split("\n");

  const sections: AnalisisSection[] = [];
  let activeTitle: string | null = null;
  let activeLines: string[] = [];

  let seenFirstTitle = false;

  const flush = () => {
    if (!activeTitle) return;
    const content = activeLines.join("\n").trim();
    const title = activeTitle;
    const id = slugify(title);

    const searchText = [
      title,
      content.replace(/\t/g, " ").replace(/\s+/g, " ").trim(),
    ].join(" ").toLowerCase();

    sections.push({ title, id, content, searchText });
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();

    if (trimmed.length === 0) {
      if (activeTitle) activeLines.push(line);
      continue;
    }

    if (!seenFirstTitle) {
      activeTitle = trimmed;
      activeLines = [];
      seenFirstTitle = true;
      continue;
    }

    const candidate = isHeadingCandidate(trimmed);
    if (candidate && isHeadingLine(lines, i)) {
      flush();
      activeTitle = trimmed;
      activeLines = [];
      continue;
    }

    if (activeTitle) activeLines.push(line);
  }

  flush();
  return sections;
}

// Pequeño helper exportado para pruebas/uso en cliente.
export function countSearchMatches(sectionSearchText: string, query: string) {
  return countQueryOccurrences(sectionSearchText, query);
}

