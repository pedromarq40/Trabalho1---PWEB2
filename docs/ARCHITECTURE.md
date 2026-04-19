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
TRABALHO-PWEB/
├── back/                          # Backend Application
│   ├── prisma/
│   │   ├── schema.prisma         # Database Schema (Paciente, Medico, Atendimento)
│   │   └── migrations/           # Database Migrations (11 migrações atuais)
│   ├── src/
│   │   ├── db/
│   │   │   └── prisma.ts         # Prisma Client
│   │   ├── routes/
│   │   │   ├── index.ts          # Router Principal
│   │   │   ├── paciente.routes.ts # GET/POST/PATCH Paciente
│   │   │   ├── medico.routes.ts   # GET/POST/PATCH Médico
│   │   │   ├── atendimento.routes.ts # GET/POST/PATCH Atendimento
│   │   │   └── login.routes.ts    # POST Login (Paciente/Médico)
│   │   └── server.ts             # Express Server
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example (DATABASE_URL)
├── front/                         # Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx        # Navegação principal
│   │   │   └── Protegida.tsx     # Protetor de rotas (futura)
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Landing Page
│   │   │   ├── login.tsx         # Login (Paciente/Médico)
│   │   │   ├── cadastroMedico.tsx # Registro de Médico
│   │   │   └── cadastroPaciente.tsx # Registro de Paciente
│   │   ├── service/
│   │   │   └── api.ts            # Axios client (base URL: http://localhost:3000)
│   │   ├── App.tsx               # Componente Raiz com React Router
│   │   ├── main.tsx              # Ponto de entrada
│   │   ├── index.css
│   │   └── App.css
│   ├── public/                   # Assets estáticos
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
├── docs/                          # Documentação
│   ├── README.md                 # Índice da documentação
│   ├── SETUP.md                  # Instalação e configuração
│   ├── ARCHITECTURE.md           # Este arquivo
│   ├── DATABASE.md               # Esquema do banco
│   └── API.md                    # Endpoints REST
└── README.md                      # README do projeto
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
- **Router Pattern:** Separação de rotas por domínio (paciente, médico, atendimento, login)
- **Middleware Pattern:** Uso de middlewares para CORS e JSON parsing
- **Error Handling:** Tratamento de erros com códigos HTTP apropriados

### Frontend
- **Component-based:** Componentes reutilizáveis (Header, Protegida, etc.)
- **SPA (Single Page Application):** Roteamento no lado do cliente com React Router
- **State Management:** Estado local com React hooks
- **API Client:** Camada de abstração com Axios

---

## 🛣️ Rotas do Frontend

### Estrutura de Roteamento

```
/                          → Home (Landing Page)
/login                     → Login (Paciente/Médico)
/cadastro-paciente         → Registro de Paciente
/cadastro-medico           → Registro de Médico
/dashboard                 → Dashboard (página após login - futura)
```

### Detalhes das Rotas

| Rota | Componente | Descrição | Autenticação |
|------|-----------|-----------|--------------|
| `/` | `Home.tsx` | Landing page com opções de cadastro/login | Não |
| `/login` | `login.tsx` | Login com escolha Paciente/Médico | Não |
| `/cadastro-paciente` | `cadastroPaciente.tsx` | Formulário de cadastro de paciente | Não |
| `/cadastro-medico` | `cadastroMedico.tsx` | Formulário de cadastro de médico | Não |

### Componentes Principais

1. **Header.tsx**
   - Navegação principal
   - Links para Home, Login, Cadastro
   - Gerenciamento de estado de autenticação

2. **Protegida.tsx**
   - Componente protetor de rotas
   - Redireciona para login se não autenticado
   - Será usado para rotas futuras (Dashboard, etc.)

3. **login.tsx**
   - Seletor de tipo de usuário (Paciente/Médico)
   - Formulário de email e senha
   - Integração com API `/login/paciente` e `/login/medico`
   - Tratamento de erros com mensagens customizadas

---

## Fluxo de Autenticação (Frontend → Backend)

```
┌─────────────────────────────┐
│   Página de Login (React)   │
│  - Email + Senha            │
│  - Tipo: Paciente/Médico    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   POST /login/paciente ou   │
│   POST /login/medico        │
│   (via Axios)               │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Backend (Express Router)  │
│   - Busca usuário por email │
│   - bcrypt.compare()        │
│   - Validação de senha      │
└──────────────┬──────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
    ✅ Sucesso     ❌ Erro
    (200)          (401)
       │
       ▼
  Renderiza 
  mensagem/erro
  Redireciona
  para dashboard
```

---

## Dependências Principais

### Backend
- **express:** Framework web
- **prisma:** ORM para banco de dados
- **bcrypt:** Hash de senhas (v10 salt rounds)
- **typescript:** Tipagem estática
- **cors:** Middleware CORS

### Frontend
- **react:** Biblioteca UI
- **react-router-dom:** Roteamento
- **axios:** Cliente HTTP
- **tailwind css:** Estilos
- **lucide-react:** Ícones
- **typescript:** Tipagem estática
- **vite:** Build tool

---

## 🔒 Segurança Implementada

✅ **Senhas Hashadas:**
- Algoritmo: bcrypt
- Salt Rounds: 10
- Implementado em: `paciente.routes.ts`, `medico.routes.ts`, `login.routes.ts`

✅ **Validação de Duplicatas:**
- CPF único (paciente, médico)
- Email único (paciente, médico)
- Erro HTTP 409 para conflitos

✅ **Tratamento de Erros:**
- Mensagens específicas para diferentes falhas
- Códigos HTTP apropriados
- Logs de erro no console

---

## 📊 Diagrama de Estado da Aplicação

```
Não Autenticado         Autenticado
    │                       │
    ├─ Home          ├─ Dashboard
    ├─ Login         ├─ Perfil
    ├─ Cadastro      └─ Consultas
    └─ Sobre
```

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