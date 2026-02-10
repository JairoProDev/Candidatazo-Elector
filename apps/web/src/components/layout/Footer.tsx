import Link from "next/link";

/* ------------------------------------------------------------------
   Countdown helper (server-side, computed at request time)
   ------------------------------------------------------------------ */
function daysUntilElection(): number {
  const election = new Date("2026-04-12T00:00:00-05:00");
  const now = new Date();
  const diff = Math.ceil(
    (election.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff > 0 ? diff : 0;
}

/* ================================================================== */

export function Footer() {
  const daysLeft = daysUntilElection();

  return (
    <footer className="relative">
      {/* Dark navy body */}
      <div className="bg-[#1A1A2E] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* ---- Brand column ---- */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-gold rounded-xl flex items-center justify-center">
                  <span className="text-white font-extrabold text-lg">C</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-white leading-tight">
                    Candidatazo
                  </span>
                  <span className="text-[10px] font-medium text-gold tracking-wider uppercase leading-tight">
                    Perú 2026
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
                Plataforma de información electoral imparcial para que votes con
                conocimiento. Sin afiliación a ningun partido politico.
              </p>

              {/* Social media links */}
              <div className="flex items-center gap-3">
                <SocialLink
                  href="https://twitter.com/candidatazo"
                  label="Twitter"
                  icon={
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.32 3.91A12.14 12.14 0 013 4.89a4.28 4.28 0 001.32 5.72 4.24 4.24 0 01-1.94-.54v.06a4.28 4.28 0 003.43 4.19 4.28 4.28 0 01-1.93.07 4.29 4.29 0 004 2.97A8.59 8.59 0 012 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0024 5.06a8.57 8.57 0 01-2.54.7z" />
                  }
                />
                <SocialLink
                  href="https://instagram.com/candidatazo"
                  label="Instagram"
                  icon={
                    <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4 7.75A3.75 3.75 0 017.75 4h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5zM12 8a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4zm4.5-2.5a1 1 0 110 2 1 1 0 010-2z" />
                  }
                />
                <SocialLink
                  href="https://tiktok.com/@candidatazo"
                  label="TikTok"
                  icon={
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .55.04.81.11v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.45a4.85 4.85 0 01-3.77-1.25V6.69h3.77z" />
                  }
                />
              </div>
            </div>

            {/* ---- Navigation column ---- */}
            <div>
              <h3 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">
                Herramientas
              </h3>
              <ul className="space-y-2.5">
                <FooterLink href="/test" label="ADN Test" />
                <FooterLink href="/candidatos" label="Candidatos" />
                <FooterLink href="/verificador" label="Verificador" />
                <FooterLink href="/simulador" label="Simulador IA" />
                <FooterLink href="/predictor" label="Predictor" />
                <FooterLink href="/academia" label="Academia" />
              </ul>
            </div>

            {/* ---- Info column ---- */}
            <div>
              <h3 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">
                Informacion
              </h3>
              <ul className="space-y-2.5">
                <FooterLink href="/metodologia" label="Metodologia" />
                <FooterLink href="/transparencia" label="Transparencia" />
                <FooterLink href="/privacidad" label="Privacidad" />
              </ul>
            </div>

            {/* ---- Election countdown column ---- */}
            <div>
              <h3 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">
                Elecciones 2026
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Primera vuelta: 12 de abril de 2026
              </p>
              <div className="bg-secondary-700 rounded-xl p-4 border border-secondary-600">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                  Dias restantes
                </p>
                <p className="text-3xl font-extrabold text-primary">
                  {daysLeft}
                </p>
              </div>
            </div>
          </div>

          {/* ---- Bottom bar ---- */}
          <div className="border-t border-secondary-600 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              2026 Candidatazo. Proyecto de información civica.
            </p>
            <p className="text-sm font-medium text-gold-400">
              Hecho con orgullo en Perú
            </p>
            <p className="text-xs text-gray-500">
              No afiliado a ningun partido politico.
            </p>
          </div>
        </div>
      </div>

      {/* Red / white stripe at the bottom edge (Peruvian flag motif) */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-white to-primary" />
    </footer>
  );
}

/* ------------------------------------------------------------------
   SUB-COMPONENTS
   ------------------------------------------------------------------ */

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
      >
        {label}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg bg-secondary-600 hover:bg-primary flex items-center justify-center transition-colors duration-200"
    >
      <svg
        className="w-4 h-4 text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {icon}
      </svg>
    </a>
  );
}
