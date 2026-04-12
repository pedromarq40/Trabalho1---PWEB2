# Arquitetura do Sistema - MedSync

## Visão Geral

O MedSync é uma aplicação web full-stack seguindo a arquitetura cliente-servidor. O frontend é uma Single Page Application (SPA) em React, enquanto o backend é uma API REST em Node.js.

## Componentes Principais

### Frontend (React + TypeScript)
- **Framework:** React 19
- **Linguagem:** TypeScript
- **Build Tool:** Vite
- **Roteamento:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Ícones:** Lucide React
- **Linting:** ESLint

### Backend (Node.js + Express)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **ORM:** Prisma
- **Banco:** SQLite
- **Middleware:** CORS

## Estrutura de Diretórios

```
projeto_pweb2/
├── back/                          # Backend Application
│   ├── prisma/
│   │   ├── schema.prisma         # Database Schema
│   │   └── migrations/           # Database Migrations
│   ├── src/
│   │   ├── db/
│   │   │   └── prisma.ts         # Database Connection
│   │   ├── routes/
│   │   │   ├── index.ts          # Main Router
│   │   │   ├── paciente.routes.ts # Patient Routes
│   │   │   └── medico.routes.ts   # Doctor Routes
│   │   └── server.ts             # Express Server
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── front/                         # Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx        # Application Header
│   │   │   └── Protegida.tsx     # Protected Component
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Landing Page
│   │   │   └── cadastroPaciente.tsx # Patient Registration
│   │   ├── service/
│   │   │   └── api.ts            # API Configuration
│   │   └── App.tsx               # Main App Component
│   ├── public/                   # Static Assets
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── docs/                          # Documentation
└── README.md                      # Project README
```

## Fluxo de Dados

```
┌─────────────────┐    HTTP Request    ┌─────────────────┐
│   React App     │ ──────────────────► │  Express API    │
│   (Frontend)    │                     │   (Backend)     │
└─────────────────┘                     └─────────────────┘
         │                                       │
         │                                       ▼
         │                               ┌─────────────────┐
         │                               │    Prisma ORM   │
         │                               └─────────────────┘
         │                                       │
         │                                       ▼
         │                               ┌─────────────────┐
         │                               │   SQLite DB     │
         │                               └─────────────────┘
         │                                       │
         │                                       ▼
         │                               ┌─────────────────┐
         │                               │   Migrations    │
         │                               └─────────────────┘
         │
         ▼
┌─────────────────┐
│   User Interface│
│   (Browser)     │
└─────────────────┘
```

## Padrões de Design

### Backend
- **Repository Pattern:** Abstração do acesso a dados via Prisma
- **Router Pattern:** Separação de rotas por domínio (paciente, médico)
- **Middleware Pattern:** Uso de middlewares para CORS e JSON parsing

### Frontend
- **Component-Based Architecture:** Reutilização de componentes React
- **Container/Presentational Pattern:** Separação de lógica e apresentação
- **Service Layer:** Centralização de chamadas API

## Tecnologias e Justificativas

| Tecnologia | Justificativa |
|------------|---------------|
| React | Componentes reutilizáveis, grande ecossistema |
| TypeScript | Tipagem estática, melhor DX e prevenção de bugs |
| Vite | Build rápido, HMR, configuração simples |
| Express.js | Framework minimalista, flexível para APIs |
| Prisma | Type-safe ORM, migrações automatizadas |
| SQLite | Banco leve, sem necessidade de servidor |
| Tailwind CSS | Utility-first, rápido desenvolvimento de UI |
| Axios | Cliente HTTP robusto com interceptors |

## Comunicação

- **Frontend ↔ Backend:** HTTP/HTTPS via Axios
- **Backend ↔ Database:** Prisma Client (SQL queries)
- **Interno Frontend:** Props, Context API, React Router

## Segurança

### Implementado
- CORS habilitado
- Validação básica de entrada

### Não Implementado (Próximas Features)
- Autenticação JWT
- Autorização baseada em roles
- Sanitização de entrada
- Rate limiting
- Hash de senhas
- HTTPS em produção

## Escalabilidade

### Pontos Fortes
- Separação clara de responsabilidades
- Componentes modulares
- API RESTful

### Limitações Atuais
- Monolito backend
- Sem cache
- Sem CDN para assets
- Banco SQLite (não escalável)

## Ambiente de Desenvolvimento

- **Node.js:** v18+
- **npm:** Gerenciador de pacotes
- **Git:** Controle de versão
- **VS Code:** IDE recomendada

## Deploy

### Desenvolvimento
- Frontend: `npm run dev` (porta 5173)
- Backend: `npm run dev` (porta 3000)

### Produção (Planejado)
- Frontend: Build estático hospedado em CDN
- Backend: Containerizado com Docker
- Database: Migração para PostgreSQL