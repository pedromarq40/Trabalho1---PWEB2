# Setup Rápido - MedSync

## Pré-requisitos
- Node.js 18+
- npm
- Git

## Instalação

### 1. Clonar e Entrar no Projeto
```bash
git clone <url-do-repositorio>
cd projeto_pweb2
```

### 2. Backend
```bash
cd back
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```
**URL:** http://localhost:3000

### 3. Frontend (Novo Terminal)
```bash
cd front
npm install
npm run dev
```
**URL:** http://localhost:5173

## Verificar
- Backend: `curl http://localhost:3000/paciente/` → `[]`
- Frontend: Abrir http://localhost:5173 no navegador

## Problemas Comuns
- Porta ocupada: `lsof -i :3000` e `kill -9 <PID>`
- Dependências: `rm -rf node_modules && npm install`
- Banco: `npx prisma migrate reset`

```bash
cd front

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

## Configuração do Ambiente

### Variáveis de Ambiente (Backend)

O arquivo `.env` deve conter:

```env
# URL do banco de dados SQLite
DATABASE_URL="file:./dev.db"
```

### Arquivos de Configuração

- **Backend:**
  - `tsconfig.json`: Configuração TypeScript
  - `prisma/schema.prisma`: Esquema do banco

- **Frontend:**
  - `vite.config.ts`: Configuração Vite
  - `tsconfig.json`: Configuração TypeScript
  - `tailwind.config.js`: Configuração Tailwind CSS

## Executando a Aplicação

### Desenvolvimento

1. **Backend:** `npm run dev` (pasta `back/`)
2. **Frontend:** `npm run dev` (pasta `front/`)

### Produção

```bash
# Frontend
cd front
npm run build
npm run preview

# Backend (não configurado para produção)
cd back
npm run build  # Se houver script
```

## Scripts Disponíveis

### Backend (`back/package.json`)

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