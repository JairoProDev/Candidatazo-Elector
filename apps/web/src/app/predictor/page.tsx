"use client";

import { useState } from "react";
import Link from "next/link";

interface Candidate {
  name: string;
  party: string;
  percentage: number;
  color: string;
}

const INITIAL_CANDIDATES: Candidate[] = [
  { name: "Keiko Fujimori", party: "Fuerza Popular", percentage: 22, color: "#FF6B00" },
  { name: "Antauro Humala", party: "Frente Patriotico", percentage: 15, color: "#8B0000" },
  { name: "Veronika Mendoza", party: "Juntos por el Peru", percentage: 12, color: "#DC2626" },
  { name: "Hernando de Soto", party: "Avanza Pais", percentage: 10, color: "#2563EB" },
  { name: "Cesar Acuna", party: "Alianza para el Progreso", percentage: 8, color: "#7C3AED" },
  { name: "Daniel Urresti", party: "Podemos Peru", percentage: 8, color: "#0891B2" },
  { name: "Julio Guzman", party: "Partido Morado", percentage: 7, color: "#A855F7" },
  { name: "George Forsyth", party: "Somos Peru", percentage: 6, color: "#059669" },
];

const REGIONAL_PREDICTIONS = [
  { region: "Lima", leader: "Keiko Fujimori", percentage: 26 },
  { region: "Cusco", leader: "Veronika Mendoza", percentage: 28 },
  { region: "Arequipa", leader: "Hernando de Soto", percentage: 22 },
  { region: "La Libertad", leader: "Cesar Acuna", percentage: 35 },
  { region: "Puno", leader: "Antauro Humala", percentage: 30 },
  { region: "Junin", leader: "Antauro Humala", percentage: 24 },
];

export default function PredictorPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [otrosPercentage, setOtrosPercentage] = useState(12);
  const [totalVotes, setTotalVotes] = useState(14832);
  const [userVoted, setUserVoted] = useState<string | null>(null);

  const totalCandidatePercentage = candidates.reduce((sum, c) => sum + c.percentage, 0) + otrosPercentage;

  const handleVote = (candidateName: string) => {
    if (userVoted) return;

    setUserVoted(candidateName);
    setTotalVotes((prev) => prev + 1);

    setCandidates((prev) => {
      const updated = prev.map((c) => {
        if (c.name === candidateName) {
          return { ...c, percentage: Math.min(c.percentage + 0.5, 99) };
        }
        return c;
      });

      // Normalize to keep approximately 100%
      const candidateTotal = updated.reduce((sum, c) => sum + c.percentage, 0);
      const targetTotal = 100 - otrosPercentage;
      if (candidateTotal > targetTotal) {
        const excess = candidateTotal - targetTotal;
        const others = updated.filter((c) => c.name !== candidateName);
        const othersTotal = others.reduce((sum, c) => sum + c.percentage, 0);
        return updated.map((c) => {
          if (c.name !== candidateName && othersTotal > 0) {
            return {
              ...c,
              percentage: Math.max(
                1,
                parseFloat((c.percentage - (excess * c.percentage) / othersTotal).toFixed(1))
              ),
            };
          }
          return c;
        });
      }
      return updated;
    });
  };

  const maxPercentage = Math.max(...candidates.map((c) => c.percentage));

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-medium">Predictor Electoral</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-gold-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              En vivo - Predicciones comunitarias
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Predictor{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                Electoral 2026
              </span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Quien crees que ganara las elecciones? Apuesta tus puntos virtuales y
              mira las predicciones de la comunidad en tiempo real.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center p-4">
            <p className="text-2xl font-extrabold text-primary">{totalVotes.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Predicciones totales</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-extrabold text-gold">{candidates.length}</p>
            <p className="text-xs text-gray-500 mt-1">Candidatos principales</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-extrabold text-secondary">{REGIONAL_PREDICTIONS.length}</p>
            <p className="text-xs text-gray-500 mt-1">Regiones analizadas</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-extrabold text-success">24h</p>
            <p className="text-xs text-gray-500 mt-1">Actualizacion continua</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main chart - Predictions */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Predicciones de la Comunidad
                </h2>
                <span className="badge bg-primary-50 text-primary text-xs">
                  {userVoted ? "Ya votaste" : "Vota abajo"}
                </span>
              </div>

              {/* Bar chart */}
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div key={candidate.name} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                          style={{ backgroundColor: candidate.color }}
                        >
                          {candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {candidate.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">{candidate.party}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-lg font-extrabold text-gray-800">
                          {candidate.percentage.toFixed(1)}%
                        </span>
                        <button
                          onClick={() => handleVote(candidate.name)}
                          disabled={userVoted !== null}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            userVoted === candidate.name
                              ? "bg-primary text-white shadow-card"
                              : userVoted !== null
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-primary-50 text-primary hover:bg-primary hover:text-white hover:shadow-card"
                          }`}
                        >
                          {userVoted === candidate.name ? "Votado" : "Votar"}
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${(candidate.percentage / maxPercentage) * 100}%`,
                          backgroundColor: candidate.color,
                        }}
                      />
                    </div>
                  </div>
                ))}

                {/* Otros */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-bold">
                        +
                      </div>
                      <div>
                        <p className="font-semibold text-gray-600 text-sm">Otros candidatos</p>
                        <p className="text-xs text-gray-400">28 candidatos mas</p>
                      </div>
                    </div>
                    <span className="text-lg font-extrabold text-gray-500">
                      {otrosPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gray-300 transition-all duration-700"
                      style={{ width: `${(otrosPercentage / maxPercentage) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                  Predicciones se actualizan cada hora. Basado en {totalVotes.toLocaleString()} votos
                  de la comunidad Candidatazo.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Regional breakdown */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Por Region
              </h3>
              <div className="space-y-3">
                {REGIONAL_PREDICTIONS.map((region) => (
                  <div
                    key={region.region}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{region.region}</p>
                      <p className="text-xs text-gray-500">Favorito: {region.leader}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{region.percentage}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                En Lima creen que gana Keiko, en Cusco creen que gana Mendoza
              </p>
            </div>

            {/* Leaderboard placeholder */}
            <div className="card bg-gradient-to-br from-gold-50 to-white border border-gold-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Tabla de Predictores
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Los mejores predictores ganan puntos y reconocimiento.
              </p>
              <div className="space-y-2">
                {[
                  { rank: 1, name: "AnalistaPeru23", points: 2450, medal: "bg-gold text-white" },
                  { rank: 2, name: "PolitologaLima", points: 2100, medal: "bg-gray-300 text-gray-700" },
                  { rank: 3, name: "VotanteInfo", points: 1850, medal: "bg-amber-700 text-white" },
                ].map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center gap-3 p-2 rounded-lg bg-white/70"
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${user.medal}`}
                    >
                      {user.rank}
                    </span>
                    <span className="text-sm font-medium text-gray-700 flex-1">
                      {user.name}
                    </span>
                    <span className="text-xs font-bold text-gold-600">
                      {user.points.toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gold-200">
                <p className="text-xs text-gray-400 text-center">
                  Proximamente: Tabla completa con premios
                </p>
              </div>
            </div>

            {/* Info card */}
            <div className="card bg-primary-50 border border-primary-100">
              <h3 className="font-bold text-gray-800 mb-2">Como funciona?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  Vota por el candidato que crees que ganara
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  Las predicciones se agregan con la comunidad
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  Gana puntos si aciertas despues de la eleccion
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="card bg-gradient-to-r from-primary-50 to-gold-50 border border-primary-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Quieres saber con quien haces match?
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              No basta predecir quien gana. Descubre quien te representa mejor con el DNA Test.
            </p>
            <Link href="/test" className="btn-primary">
              Hacer el DNA Test
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
