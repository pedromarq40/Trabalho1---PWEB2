# Trabalho 1 — PWEB2

**Alunos:**
* Bruno Gabriel Silva de Sena
* Pedro Marques dos Santos Lima
* Victor Miguel da Silva Bezerra

Projeto acadêmico dividido em Frontend (React) e Backend (Node.js, Express, Prisma e SQLite).

---

## 🚀 Como rodar o projeto

Para executar a aplicação localmente, você precisará abrir **dois terminais** na pasta raiz do projeto (um terminal para rodar o back e outro para o front).

### 🖥️ Terminal 1: Preparando e rodando o Backend
Execute os comandos abaixo na ordem exata para entrar na pasta, copiar as variáveis de ambiente, instalar dependências, gerar o banco SQLite e ligar a API:

```bash
cd back
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

### 🎨 Terminal 2: Preparando e rodando o Frontend
Abra um novo terminal (também na raiz do repositório) e execute a sequência abaixo para preparar as variáveis e ligar a interface em React:

```bash
cd front
npm install
npm run dev
```