# MedSync - Plataforma de Gestão Médica

**Trabalho 1 — PWEB2**

**Alunos:**
* Bruno Gabriel Silva de Sena
* Pedro Marques dos Santos Lima
* Victor Miguel da Silva Bezerra

## 📋 Sobre o Projeto

MedSync é uma plataforma web full-stack para gestão de atendimento médico, desenvolvida como projeto acadêmico. O sistema permite o cadastro e gerenciamento de pacientes e médicos, facilitando a conexão entre profissionais de saúde e seus pacientes.

**Tecnologias:** React, Node.js, Express, Prisma, SQLite, TypeScript, Tailwind CSS

## 📚 Documentação

- **[Instalação e Configuração](docs/SETUP.md)** - Guia completo para setup do projeto
- **[Arquitetura do Sistema](docs/ARCHITECTURE.md)** - Visão técnica da arquitetura
- **[Funcionalidades](docs/FEATURES.md)** - Recursos implementados e planejados
- **[API](docs/API.md)** - Documentação dos endpoints REST
- **[Banco de Dados](docs/DATABASE.md)** - Esquema e modelos de dados

## 🚀 Como Executar

Para executar a aplicação localmente, você precisará abrir **dois terminais** na pasta raiz do projeto (um terminal para rodar o back e outro para o front).

### 🖥️ Terminal 1: Backend
```bash
cd back
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

### 🎨 Terminal 2: Frontend
```bash
cd front
npm install
npm run dev
```

**URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📁 Estrutura do Projeto

```
projeto_pweb2/
├── back/                 # Backend Node.js/Express
├── front/                # Frontend React/Vite
├── docs/                 # Documentação
└── README.md
```

## 🤝 Contribuição

Este é um projeto acadêmico. Para sugestões ou melhorias, consulte a documentação ou abra uma issue.