import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold">C</span>
              </div>
              <span className="text-lg font-extrabold text-white">
                Candidatazo
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Plataforma de informacion electoral para que votes con
              conocimiento. Elecciones Peru 2026.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Producto</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/test" className="text-sm hover:text-white transition-colors">
                  DNA Test Politico
                </Link>
              </li>
              <li>
                <Link href="/candidatos" className="text-sm hover:text-white transition-colors">
                  Candidatos
                </Link>
              </li>
              <li>
                <Link href="/verificador" className="text-sm hover:text-white transition-colors">
                  Verificador de Datos
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Informacion</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-400">
                  Metodologia
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-400">
                  Transparencia
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-400">
                  Privacidad
                </span>
              </li>
            </ul>
          </div>

          {/* Election */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Elecciones 2026
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Primera vuelta: 12 de abril de 2026
            </p>
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Dias restantes</p>
              <p className="text-2xl font-extrabold text-primary">
                <CountdownDays />
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            2026 Candidatazo. Proyecto de informacion civica.
          </p>
          <p className="text-xs text-gray-500">
            No afiliado a ningun partido politico.
          </p>
        </div>
      </div>
    </footer>
  );
}

function CountdownDays() {
  const election = new Date("2026-04-12");
  const today = new Date();
  const diff = Math.ceil(
    (election.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return <>{diff > 0 ? diff : 0}</>;
}
