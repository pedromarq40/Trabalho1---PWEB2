# Setup Rápido - MedSync

## ⏱️ Tempo Estimado: 10-15 minutos

## 📋 Pré-requisitos

- **Node.js:** v18 ou superior
- **npm:** v9 ou superior (incluso com Node.js)
- **Git:** para clonar o repositório
- **Terminal/Shell:** bash, zsh, ou cmd
- **Porta 3000:** para o Backend (Express)
- **Porta 5173:** para o Frontend (Vite)

**Verificar as versões instaladas:**
```bash
$ node --version   # v18.x ou superior
$ npm --version    # v9.x ou superior
$ git --version    # git version 2.x ou superior
```

---

## 🚀 Instalação Passo-a-Passo

### 1️⃣ Clonar o Repositório

```bash
$ git clone <url-do-repositorio>
$ cd TRABALHO-PWEB
```

### 2️⃣ Configurar Backend

```bash
# Entrar na pasta do backend
$ cd back

# Copiar arquivo de exemplo para .env
$ cp .env.example .env

# Verificar se .env possui:
# DATABASE_URL="file:./dev.db"

# Instalar dependências
$ npm install

# Criar/atualizar o banco de dados
$ npx prisma migrate dev

# Iniciar servidor (deve rodar em http://localhost:3000)
$ npm run dev
```

✅ **Verificação Backend:**
```bash
$ curl http://localhost:3000/paciente/
# Resposta esperada: []
```

### 3️⃣ Configurar Frontend (Novo Terminal)

```bash
# Abrir novo terminal/aba
# Voltar à raiz do projeto (se necessário)
$ cd ../front

# Instalar dependências
$ npm install

# Iniciar servidor de desenvolvimento (deve rodar em http://localhost:5173)
$ npm run dev
```

✅ **Verificação Frontend:**
- Abrir http://localhost:5173 no navegador
- Deve carregar a página Home sem erros

---

## 🧪 Testando a Integração

### 1. Acessar a Aplicação
```
Frontend: http://localhost:5173
Backend:  http://localhost:3000
```

### 2. Testar Endpoints Principais

**Listar Pacientes:**
```bash
$ curl http://localhost:3000/paciente/
# Resposta: []
```

**Criar Paciente:**
```bash
$ curl -X POST http://localhost:3000/paciente/ \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678900",
    "email": "joao@test.com",
    "telefone": "11987654321",
    "altura": 1.75,
    "peso": 80,
    "dataDeNascimento": "1990-05-10",
    "senha": "password123"
  }'
```

**Login de Paciente:**
```bash
$ curl -X POST http://localhost:3000/login/paciente \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@test.com",
    "senha": "password123"
  }'
# Resposta esperada: {"mensagem": "Login Efetuado com Sucesso!"}
```

---

## 🔧 Configuração do Ambiente

### Backend - Variáveis de Ambiente

Arquivo: `back/.env`

```env
# Database SQLite
DATABASE_URL="file:./dev.db"
```

### Frontend - Variáveis de Ambiente

Arquivo: `front/.env` (se necessário no futuro)

```env
# API Base URL (opcional, padrão: http://localhost:3000)
VITE_API_URL=http://localhost:3000
```

---

## 📝 Scripts Disponíveis

### Backend (`back/package.json`)

```bash
# Desenvolvimento - com hot reload
$ npm run dev

# Build TypeScript
$ npm run build

# Executar migrations do Prisma
$ npx prisma migrate dev

# Resetar banco (CUIDADO: deleta todos os dados)
$ npx prisma migrate reset

# Abrir Prisma Studio (visualizar DB)
$ npx prisma studio
```

### Frontend (`front/package.json`)

```bash
# Desenvolvimento - com hot reload em http://localhost:5173
$ npm run dev

# Build para produção
$ npm run build

# Pré-visualizar build
$ npm run preview

# Lint com ESLint
$ npm run lint
```

---

## ⚠️ Problemas Comuns e Soluções

### ❌ "EADDRINUSE: address already in use :::3000"

**Problema:** Porta 3000 já está em uso

**Solução:**
```bash
# Linux/Mac - Encontrar processo
$ lsof -i :3000

# Linux/Mac - Matar processo
$ kill -9 <PID>

# Windows - Encontrar processo
$ netstat -ano | findstr :3000

# Windows - Matar processo
$ taskkill /PID <PID> /F
```

**Alternativa:** Mudar port no `server.ts` (antes de `npm run dev`)

### ❌ "Cannot find module 'express'"

**Problema:** Dependências não instaladas

**Solução:**
```bash
$ rm -rf node_modules package-lock.json
$ npm install
```

### ❌ "Prisma client not found"

**Problema:** Prisma Cliente não foi gerado

**Solução:**
```bash
$ npm install
$ npx prisma generate
```

### ❌ "Database error / migration failed"

**Problema:** Banco de dados corrompido ou migrations desincronizadas

**Solução (PERDA DE DADOS):**
```bash
$ npx prisma migrate reset
# Selecione 'y' quando perguntado
```

### ❌ Frontend não consegue conectar ao Backend

**Problema:** CORS ou URL incorreta

**Verificação:**
1. Backend está rodando em `http://localhost:3000`?
2. Frontend está tentando conectar em `http://localhost:3000`? (ver `front/src/service/api.ts`)
3. Backend tem CORS habilitado?

### ❌ "Port 5173 already in use"

**Problema:** Porta do Vite ocupada

**Solução:** Mudar porta em `front/vite.config.ts`:
```typescript
server: {
  port: 5174  // Mudar para outra porta
}
```

---

## 🗄️ Gerenciando o Banco de Dados

### Ver dados com Prisma Studio

```bash
$ cd back
$ npx prisma studio
# Abre em http://localhost:5555
```

### Criar nova migração após alterar schema

```bash
$ cd back

# Edite prisma/schema.prisma

# Crie a migração
$ npx prisma migrate dev --name descricao_da_mudanca

# Exemplo:
$ npx prisma migrate dev --name adicionar_campo_endereco
```

### Resetar banco (deleta todos os dados)

```bash
$ cd back
$ npx prisma migrate reset
```

---

## 📦 Estrutura Instalada

Após `npm install` em ambas as pastas:

### Backend - Dependências Principais
- `express` - Framework web
- `prisma` - ORM para banco de dados
- `@prisma/client` - Cliente Prisma
- `bcrypt` - Hash de senhas
- `typescript` - Suporte TypeScript
- `cors` - Middleware CORS
- `dotenv` - Variáveis de ambiente

### Frontend - Dependências Principais
- `react` - Biblioteca UI
- `react-dom` - Renderização DOM
- `react-router-dom` - Roteamento
- `axios` - Cliente HTTP
- `tailwindcss` - Framework CSS
- `lucide-react` - Ícones
- `typescript` - Suporte TypeScript
- `vite` - Build tool

---

## ✨ Verificação Final

Se tudo funcionou, você deve conseguir:

- [ ] Backend rodando em `http://localhost:3000`
- [ ] Frontend rodando em `http://localhost:5173`
- [ ] `curl http://localhost:3000/paciente/` retorna `[]`
- [ ] Frontend carrega página Home
- [ ] Página de Login funciona
- [ ] Prisma Studio acessível (opcional)

---

## 🆘 Ainda com Problemas?

1. **Verifique logs:** Procure por mensagens de erro no terminal
2. **Limpe cache:** `rm -rf node_modules && npm install`
3. **Reset DB:** `npx prisma migrate reset`
4. **Reinicie tudo:** Feche terminals, aguarde 5s, comece do zero

---

## 📖 Próximos Passos

Após conseguir rodar a aplicação:

1. Leia [ARCHITECTURE.md](ARCHITECTURE.md) para entender a estrutura
2. Leia [API.md](API.md) para ver todos os endpoints
3. Leia [DATABASE.md](DATABASE.md) para entender os modelos
4. Comece a explorar e modificar o código!

---

## 🎉 Parabéns!

Sua instância MedSync está pronta para desenvolvimento! 🚀

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### Frontend (`front/package.json`)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## Verificação da Instalação

### Testar Backend

```bash
# Verificar se API responde
curl http://localhost:3000/paciente/
```

Deve retornar uma lista vazia `[]` ou erro de banco.

### Testar Frontend

Acesse `http://localhost:5173` no navegador.

- Página inicial deve carregar
- Navegação deve funcionar
- Formulário de cadastro deve estar acessível

## Resolução de Problemas

### Erro: Porta já em uso

```bash
# Encontrar processo usando a porta
lsof -i :3000
lsof -i :5173

# Matar processo
kill -9 <PID>
```

### Erro: Dependências não instaladas

```bash
# Limpar cache npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: Banco não encontrado

```bash
cd back
npx prisma migrate reset
npx prisma generate
```

### Erro: TypeScript

```bash
# Verificar tipos
npx tsc --noEmit
```

## Estrutura de Arquivos Após Instalação

```
projeto_pweb2/
├── back/
│   ├── node_modules/
│   ├── dev.db          # Banco SQLite (criado após migrate)
│   ├── .env            # Variáveis de ambiente
│   └── ...
├── front/
│   ├── node_modules/
│   ├── dist/           # Build de produção (após build)
│   └── ...
└── ...
```

## Próximos Passos

Após a instalação:

1. **Explorar a aplicação** - Navegue pelas páginas
2. **Testar funcionalidades** - Cadastre pacientes e médicos
3. **Verificar API** - Use ferramentas como Postman ou Insomnia
4. **Personalizar** - Modifique estilos e funcionalidades

## Suporte

Para problemas de instalação:

1. Verifique os logs no terminal
2. Confirme versões dos pré-requisitos
3. Consulte a documentação específica de cada tecnologia
4. Abra uma issue no repositório