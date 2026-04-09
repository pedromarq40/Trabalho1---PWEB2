# Trabalho1---PWEB2
Trabalho de prática de Github e Git <br>
Alunos: <br>
Bruno Gabriel Silva de Sena <br>
Pedro Marques dos Santos Lima <br>
Victor Miguel da Silva Bezerra<br>

# Projeto — Front (React) + Back (Prisma + Express)

Instruções genéricas para preparar e executar o projeto em qualquer sistema (Linux / macOS / Windows). Ajuste comandos de shell conforme sua preferência (bash, zsh, PowerShell).

Prerequisitos
- Node.js (recomendado >= 18) e npm ou yarn
- Git (opcional)
- (opcional) SQLite (pode ser usado sem cliente adicional)

Estrutura esperada
- front/ — aplicação React
- back/ — API (TypeScript, Express, Prisma, SQLite)

1) Obter o código
- Clone ou copie o repositório e abra a pasta do projeto:
  - git clone <repo>
  - cd /path/to/project

2) Variáveis de ambiente
- Arquivos exemplo: `back/.env.example` e `front/.env.example`.
- Copie e edite antes de rodar.

Comandos (POSIX):
- Backend: cp back/.env.example back/.env
- Frontend: cp front/.env.example front/.env.local

Comandos (PowerShell):
- Backend: Copy-Item .\back\.env.example .\back\.env
- Frontend: Copy-Item .\front\.env.example .\front\.env.local

- Edite os arquivos (.env / .env.local) e ajuste:
  - back/.env: DATABASE_URL (ex.: DATABASE_URL="file:./dev.db"), PORT, NODE_ENV
  - front/.env.local: REACT_APP_API_URL (ex.: http://localhost:3333)

3) Backend — instalar e inicializar Prisma
- Entre na pasta do backend:
  - cd /path/to/project/back

- Instalar dependências:
  - npm install

- Gerar Prisma Client:
  - npx prisma generate
  - OBS: execute este comando a partir da pasta `back` (Prisma busca `prisma/schema.prisma` relativo ao diretório de trabalho). Se preferir, use `--schema` para apontar o arquivo.

- Aplicar esquema ao banco:
  - Com migrações (produção): npx prisma migrate deploy
  - Desenvolvimento rápido (sem migrations): npx prisma db push

- Iniciar servidor (modo dev):
  - npm run dev
  - (ou o script definido em `back/package.json`)

Verificações rápidas (dentro de back):
- Test-Path .\prisma\schema.prisma  (PowerShell) / [ -f prisma/schema.prisma ] (POSIX)
- node_modules/@prisma/client existe após `npx prisma generate`
- dev.db criado após `npx prisma db push` (se usar SQLite)

4) Frontend — instalar e rodar
- cd /path/to/project/front
- npm install
- npm start  (ou npm run dev conforme package.json)
- Confirme que `REACT_APP_API_URL` aponta para o backend correto.

5) Rodando ambos
- Abra dois terminais:
  - Terminal A: cd back && npm run dev
  - Terminal B: cd front && npm start

6) Scripts recomendados (exemplo que pode ser adicionado em back/package.json)
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "generate": "prisma generate --schema ./prisma/schema.prisma",
    "db:push": "prisma db push --schema ./prisma/schema.prisma",
    "migrate:deploy": "prisma migrate deploy --schema ./prisma/schema.prisma",
    "start": "node dist/index.js"
  }
}
```

7) Problemas comuns
- "Could not find Prisma Schema": execute `npx prisma generate` a partir da pasta `back` ou use `--schema path/to/schema.prisma`.
- "Prisma Client not found": rode `npx prisma generate` e confirme `node_modules/@prisma/client`.
- Express não encontrado: dentro de `back` rode `npm install express`.
- .env ausente: copie `back/.env.example` → `back/.env` e ajuste.
- tsconfig: remova opções inválidas (ex.: `ignoreDeprecations`) do `tsconfig.json`.

Se precisar, eu atualizo automaticamente `back/package.json` e crio/ajusto `.gitignore` e `.env.example` com base no seu projeto.
