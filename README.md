# Candidatazo - Plataforma de Informacion Electoral Peru 2026

Plataforma viral de informacion electoral para las elecciones presidenciales del Peru 2026 (12 de abril). Herramientas imparciales y basadas en datos para que 27M+ de votantes peruanos elijan con conocimiento.

## Funcionalidades

- **DNA Politico** - Test de 30 preguntas que analiza tu perfil en 5 dimensiones (Economia, Social, Ambiente, Seguridad, Institucional)
- **Match de Candidatos** - Compara tu perfil con 24+ candidatos presidenciales y encuentra tu match
- **Verificador de Datos** - Fact-checking con IA de las declaraciones de los candidatos
- **Simulador IA** - Conversa con versiones IA de los candidatos basadas en sus posiciones publicas
- **Presidente Ideal** - Construye tu presidente ideal con 15 sliders de politicas y compara con candidatos reales
- **Predictor Electoral** - Predicciones comunitarias con votacion y rankings por region
- **Academia Civica** - Cursos cortos sobre politica, gobierno y ciudadania
- **Gamificacion** - Sistema de niveles, XP, logros y tribus politicas

## Arquitectura

```
candidatazo/
├── apps/
│   ├── api/          # Fastify + TypeScript + Prisma
│   └── web/          # Next.js 15 + Tailwind CSS
├── packages/
│   ├── database/     # Prisma schema + seed data
│   ├── types/        # Tipos compartidos TypeScript
│   └── utils/        # Utilidades (scoring, matching, tribes)
├── docs/             # Documentacion del proyecto
└── turbo.json        # Turborepo config
```

**Stack:**
- **Monorepo:** Turborepo + pnpm workspaces
- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Backend:** Fastify, TypeScript, Prisma ORM
- **Base de datos:** PostgreSQL
- **IA:** Google Gemini 2.0 Flash (fact-checking, simulador)
- **Auth:** Clerk (pendiente de configurar)
- **Hosting:** Railway.app (recomendado)

## Requisitos previos

- **Node.js** >= 18
- **pnpm** >= 8 (`npm install -g pnpm`)
- **PostgreSQL** (local o remoto) - requerido solo para la API

## Instalacion

```bash
# 1. Clonar el repositorio
git clone https://github.com/JairoProDev/Candidatazo-Elector.git
cd Candidatazo-Elector

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales (ver seccion "Configuracion" abajo)

# 4. Configurar la base de datos (si vas a usar la API)
cd packages/database
npx prisma generate
npx prisma db push
npx prisma db seed
cd ../..

# 5. Iniciar en desarrollo
pnpm dev
```

La web estara en `http://localhost:3000` y la API en `http://localhost:3001`.

## Configuracion

### Variables de entorno requeridas

| Variable | Descripcion | Requerida |
|---|---|---|
| `DATABASE_URL` | URL de conexion a PostgreSQL | Solo para API |
| `GEMINI_API_KEY` | API key de Google Gemini | Para IA (opcional) |
| `NEXT_PUBLIC_API_URL` | URL del API | Para conectar web a API |

### Variables opcionales

| Variable | Descripcion |
|---|---|
| `CLERK_PUBLISHABLE_KEY` | Clerk auth (publica) |
| `CLERK_SECRET_KEY` | Clerk auth (secreta) |
| `REDIS_URL` | Redis para cache |
| `POSTHOG_API_KEY` | Analytics |
| `SENTRY_DSN` | Error tracking |
| `RESEND_API_KEY` | Envio de emails |

### Obtener credenciales

1. **PostgreSQL**: Instalar localmente (`brew install postgresql` / `apt install postgresql`) o usar [Railway](https://railway.app), [Supabase](https://supabase.com), o [Neon](https://neon.tech)
2. **Google Gemini**: Obtener API key gratuita en [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Clerk** (opcional): Crear cuenta en [clerk.com](https://clerk.com) y obtener keys del dashboard

### Sin base de datos

El frontend (web) funciona **completamente sin base de datos ni API**. Todos los datos de candidatos, preguntas del test y fact-checks estan embebidos en el frontend para funcionar offline-first. La API es necesaria solo para persistir datos de usuario, resultados del test y features comunitarias.

## Scripts

```bash
# Desarrollo
pnpm dev              # Iniciar web + API en desarrollo
pnpm dev --filter web # Solo el frontend

# Build
pnpm build            # Build de produccion de todo
pnpm build --filter web   # Solo build del frontend

# Base de datos
pnpm --filter database db:push    # Aplicar schema
pnpm --filter database db:seed    # Poblar con datos iniciales
pnpm --filter database db:studio  # Abrir Prisma Studio

# Linting y tipos
pnpm typecheck        # Verificar tipos TypeScript
```

## Deploy en produccion

### Railway (recomendado)

1. Crear proyecto en [Railway](https://railway.app)
2. Agregar servicio PostgreSQL
3. Conectar repositorio de GitHub
4. Configurar variables de entorno
5. Railway detectara automaticamente Turborepo

### Vercel (solo frontend)

1. Importar repositorio en [Vercel](https://vercel.com)
2. Root directory: `apps/web`
3. Framework: Next.js
4. Configurar `NEXT_PUBLIC_API_URL`

## Estructura de la web

| Ruta | Pagina |
|---|---|
| `/` | Homepage con hero, features, countdown |
| `/test` | DNA Test - 30 preguntas interactivas |
| `/candidatos` | Grid de 24 candidatos con posiciones |
| `/candidatos/[slug]` | Perfil detallado de candidato |
| `/verificador` | Fact-checks con veredictos |
| `/verificador/[id]` | Detalle de verificacion |
| `/simulador` | Chat IA con candidatos |
| `/presidente-ideal` | Constructor de presidente ideal |
| `/predictor` | Predicciones electorales comunitarias |
| `/academia` | Cursos de educacion civica |
| `/metodologia` | Nuestra metodologia |
| `/transparencia` | Compromiso de transparencia |
| `/privacidad` | Politica de privacidad |

## API Endpoints

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/candidates` | Listar candidatos |
| `GET` | `/candidates/:slug` | Detalle de candidato |
| `GET` | `/dna/questions` | Preguntas del test |
| `POST` | `/dna/start` | Iniciar test |
| `POST` | `/dna/:id/complete` | Completar test |
| `GET` | `/dna/:id/results` | Resultados del test |
| `GET` | `/matches/:userId` | Matches de usuario |
| `GET` | `/factchecks` | Listar fact-checks |
| `GET` | `/factchecks/:id` | Detalle de fact-check |
| `POST` | `/users/sync` | Crear/sincronizar usuario |

## Diseno

- **Tema patriotico peruano**: Rojo (#D91023), Dorado (#D4A017), Azul marino (#1A1A2E)
- **Tipografia**: Inter (sans-serif)
- **Mobile-first**, responsive en todas las resoluciones
- **Franja de la bandera** en header y footer como motivo visual

## Licencia

Proyecto de informacion civica. Sin afiliacion a ningun partido politico.
