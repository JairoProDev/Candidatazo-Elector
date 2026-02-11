"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PowerSimulator from "./components/PowerSimulator";
import TrueFalseGame from "./components/TrueFalseGame";
import {
  INTRO_HOOK,
  DATO_MAESTRO,
  SENADO_VS_DIPUTADOS,
  DATO_MIND_BLOWING,
  REFERENDUM_2018,
  APLICACION_PRACTICA,
  PROCESO_LEGISLATIVO,
  CIERRE_IMPACTANTE,
  MODULE_METADATA
} from "./data/content";
import { useModuleAnalytics } from "./utils/analytics";

export default function BicameralidadPage() {
  const [activeTab, setActiveTab] = useState<"contenido" | "juegos">("contenido");
  const [activeGame, setActiveGame] = useState<"simulador" | "verdadero-falso" | null>(null);
  const analytics = useModuleAnalytics();

  useEffect(() => {
    // Track cuando se carga el módulo
    analytics.trackEvent("module_started");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/academia"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white mb-6 transition-colors"
          >
            ← Volver a Academia
          </Link>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Nuevo módulo disponible
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {MODULE_METADATA.titulo}
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl">
            {MODULE_METADATA.subtitulo}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="text-xs text-blue-200">Duración</p>
                <p className="font-semibold">{MODULE_METADATA.duracionLectura} min lectura</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-xs text-blue-200">XP disponible</p>
                <p className="font-semibold">{MODULE_METADATA.xpTotal} XP</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-xs text-blue-200">Badges</p>
                <p className="font-semibold">{MODULE_METADATA.badges.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("contenido")}
              className={`relative py-4 px-2 font-semibold transition-colors ${
                activeTab === "contenido"
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📚 Contenido
              {activeTab === "contenido" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("juegos")}
              className={`relative py-4 px-2 font-semibold transition-colors ${
                activeTab === "juegos"
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🎮 Mini-Juegos
              {activeTab === "juegos" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "contenido" ? (
          <ContentSection />
        ) : (
          <GamesSection activeGame={activeGame} setActiveGame={setActiveGame} />
        )}
      </div>

      {/* Footer con fuentes */}
      <section className="bg-gray-100 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold text-gray-700 mb-3">📖 Fuentes consultadas:</h3>
          <ul className="space-y-2">
            {MODULE_METADATA.fuentes.map((fuente, idx) => (
              <li key={idx} className="text-sm">
                <a
                  href={fuente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {fuente.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function ContentSection() {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Intro Hook */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-8 border border-red-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          {INTRO_HOOK.title}
        </h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {INTRO_HOOK.text}
        </div>
      </section>

      {/* Dato Maestro */}
      <section className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          {DATO_MAESTRO.title}
        </h2>
        {DATO_MAESTRO.sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {section.subtitle && (
              <h3 className="text-xl font-bold text-gray-800 mb-3">{section.subtitle}</h3>
            )}
            {section.highlights && (
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {section.highlights.map((highlight, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border-2 border-primary text-center">
                    <p className="text-4xl font-extrabold text-primary mb-1">
                      {highlight.number}
                    </p>
                    <p className="text-sm text-gray-600">{highlight.label}</p>
                  </div>
                ))}
              </div>
            )}
            <p className="text-gray-700 leading-relaxed">{section.text}</p>
          </div>
        ))}
      </section>

      {/* Senado vs Diputados */}
      <section className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          {SENADO_VS_DIPUTADOS.title}
        </h2>
        <p className="text-lg text-gray-600 mb-6">{SENADO_VS_DIPUTADOS.intro}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Senado */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-3">{SENADO_VS_DIPUTADOS.senado.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{SENADO_VS_DIPUTADOS.senado.title}</h3>
            <p className="text-blue-100 text-sm mb-4">{SENADO_VS_DIPUTADOS.senado.miembros} miembros</p>
            <ul className="space-y-2 mb-4">
              {SENADO_VS_DIPUTADOS.senado.poderes.map((poder, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-gold mt-1">•</span>
                  <span>{poder}</span>
                </li>
              ))}
            </ul>
            <div className="bg-white/10 rounded-lg p-3 mt-4">
              <p className="text-xs text-blue-100">Requisitos:</p>
              <p className="font-semibold">{SENADO_VS_DIPUTADOS.senado.requisitos}</p>
            </div>
          </div>

          {/* Diputados */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-3">{SENADO_VS_DIPUTADOS.diputados.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{SENADO_VS_DIPUTADOS.diputados.title}</h3>
            <p className="text-red-100 text-sm mb-4">{SENADO_VS_DIPUTADOS.diputados.miembros} miembros</p>
            <ul className="space-y-2 mb-4">
              {SENADO_VS_DIPUTADOS.diputados.poderes.map((poder, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-yellow-300 mt-1">•</span>
                  <span>{poder}</span>
                </li>
              ))}
            </ul>
            <div className="bg-white/10 rounded-lg p-3 mt-4">
              <p className="text-xs text-red-100">Requisitos:</p>
              <p className="font-semibold">{SENADO_VS_DIPUTADOS.diputados.requisitos}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dato Mind Blowing */}
      <section className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-8 mb-8">
        <div className="text-5xl mb-4 text-center">🤯</div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
          {DATO_MIND_BLOWING.title}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
          {DATO_MIND_BLOWING.intro}
        </p>
        <div className="bg-white rounded-xl p-6 border-2 border-yellow-500 mb-4">
          <p className="text-xl font-bold text-gray-900 text-center">
            {DATO_MIND_BLOWING.revelacion}
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          {DATO_MIND_BLOWING.explicacion}
        </p>

        <div className="bg-white rounded-xl p-4 mb-4">
          <p className="font-bold text-gray-900 mb-3">Casos reales:</p>
          <ul className="space-y-2">
            {DATO_MIND_BLOWING.casosReales.map((caso, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span>
                  <span className="font-semibold">{caso.nombre}</span> ({caso.partido})
                  {caso.edad && `: ${caso.edad} años`}
                </span>
                <span className={caso.puede ? "text-green-600 font-bold" : "text-gray-500"}>
                  {caso.puede ? "✓ Puede postular" : caso.nota}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-100 rounded-xl p-4 border-l-4 border-gray-600">
          <p className="text-sm italic text-gray-700">
            &ldquo;{DATO_MIND_BLOWING.cita.texto}&rdquo;
          </p>
          <p className="text-xs text-gray-600 mt-2">
            — {DATO_MIND_BLOWING.cita.autor}, {DATO_MIND_BLOWING.cita.cargo}
          </p>
        </div>
      </section>

      {/* Referéndum 2018 */}
      <section className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          {REFERENDUM_2018.title}
        </h2>
        <p className="text-gray-700 mb-4">{REFERENDUM_2018.intro}</p>

        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {REFERENDUM_2018.resultados.map((resultado, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border-2 ${
                resultado.aprobada
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{resultado.reforma}</span>
                <div className="text-right">
                  <span
                    className={`text-2xl font-bold ${
                      resultado.aprobada ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {resultado.porcentaje}%
                  </span>
                  <p className="text-xs text-gray-600">
                    {resultado.aprobada ? "Aprobó" : "Rechazó"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-100 border-2 border-red-500 rounded-xl p-6 text-center mb-4">
          <p className="text-4xl font-extrabold text-red-700 mb-2">
            {REFERENDUM_2018.estadistica.votosContra}
          </p>
          <p className="text-lg font-bold text-gray-800">
            {REFERENDUM_2018.estadistica.mensaje}
          </p>
          <p className="text-3xl font-extrabold text-red-700 mt-2">
            {REFERENDUM_2018.estadistica.porcentaje}
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {REFERENDUM_2018.queOcurrio}
        </p>
      </section>

      {/* Cierre */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-extrabold mb-4">{CIERRE_IMPACTANTE.title}</h2>
        <p className="text-xl mb-4">{CIERRE_IMPACTANTE.mensaje}</p>
        <p className="text-lg mb-6 text-blue-100">{CIERRE_IMPACTANTE.datoHistorico}</p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <p className="text-xl font-bold">{CIERRE_IMPACTANTE.preguntaFinal}</p>
        </div>
      </section>
    </article>
  );
}

function GamesSection({
  activeGame,
  setActiveGame
}: {
  activeGame: "simulador" | "verdadero-falso" | null;
  setActiveGame: (game: "simulador" | "verdadero-falso" | null) => void;
}) {
  const analytics = useModuleAnalytics();

  const handleGameSelect = (game: "simulador" | "verdadero-falso") => {
    setActiveGame(game);
    analytics.trackGameStarted(game);
  };

  if (activeGame === "simulador") {
    return (
      <div>
        <button
          onClick={() => setActiveGame(null)}
          className="text-primary hover:text-primary-600 font-semibold mb-4 inline-flex items-center gap-2"
        >
          ← Volver a juegos
        </button>
        <PowerSimulator />
      </div>
    );
  }

  if (activeGame === "verdadero-falso") {
    return (
      <div>
        <button
          onClick={() => setActiveGame(null)}
          className="text-primary hover:text-primary-600 font-semibold mb-4 inline-flex items-center gap-2"
        >
          ← Volver a juegos
        </button>
        <TrueFalseGame />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Simulador */}
      <button
        onClick={() => handleGameSelect("simulador")}
        className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all text-left"
      >
        <div className="text-5xl mb-4">🏛️</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
          Simulador Legislativo
        </h3>
        <p className="text-gray-600 mb-4">
          Eres congresista por un día. Toma decisiones sobre proyectos de ley reales y aprende cómo funciona el sistema bicameral.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>⏱️ 5-7 min</span>
          <span>⭐ 100 XP</span>
          <span>🏆 1 Badge</span>
        </div>
      </button>

      {/* Verdadero/Falso */}
      <button
        onClick={() => handleGameSelect("verdadero-falso")}
        className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all text-left"
      >
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
          ¿Congresista o Farsante?
        </h3>
        <p className="text-gray-600 mb-4">
          Detecta las trampas en afirmaciones políticas. ¿Verdadero o Falso? No es tan fácil como parece.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>⏱️ 3-5 min</span>
          <span>⭐ 200 XP</span>
          <span>🏆 1 Badge</span>
        </div>
      </button>
    </div>
  );
}
