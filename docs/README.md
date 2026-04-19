# Documentação - MedSync

Bem-vindo à documentação completa do projeto MedSync. Aqui você encontrará todas as informações necessárias para entender, instalar, contribuir com o projeto e utilizar a API.

## 📖 Índice da Documentação

### 🚀 Início Rápido
- **[README Principal](../README.md)** - Visão geral e primeiros passos
- **[Instalação e Configuração](SETUP.md)** - Guia detalhado de setup passo-a-passo

### 🏗️ Arquitetura e Design
- **[Arquitetura do Sistema](ARCHITECTURE.md)** - Componentes, fluxo de dados e rotas
- **[Banco de Dados](DATABASE.md)** - Esquema, modelos, relacionamentos e migrações

### ⚙️ Funcionalidades e Desenvolvimento
- **[API REST](API.md)** - Endpoints completos, exemplos e códigos de status

## 🎯 Para Quem é Esta Documentação?

- **Desenvolvedores:** Querem contribuir ou modificar o código
- **Integradores:** Querem integrar a API com outras aplicações
- **Usuários:** Querem instalar e usar a aplicação
- **Estudantes:** Querem aprender com o projeto
- **Avaliadores:** Querem entender o escopo e implementação

---

## 📝 Documentos Principais

### 1. **SETUP.md** - Instalação e Primeiro Uso
Contém:
- Pré-requisitos (Node.js, npm, git)
- Passo-a-passo de instalação
- Configuração de variáveis de ambiente
- Troubleshooting de problemas comuns

**👉 Leia isto primeiro se está iniciando um novo ambiente**

### 2. **ARCHITECTURE.md** - Entender a Estrutura
Contém:
- Visão geral da arquitetura (Frontend SPA + Backend REST)
- Estrutura de diretórios com détail
- Rotas do frontend (React Router)
- Padrões de design utilizados
- Fluxo de autenticação
- Dependências principais
- Implementação de segurança (bcrypt, validações)

**👉 Leia isto para entender como o projeto está organizado**

### 3. **DATABASE.md** - Estrutura e Dados
Contém:
- Modelos: Paciente, Médico, Atendimento
- Tipos de dados e validações
- Relacionamentos entre entidades
- Diagrama ER
- Considerações de segurança

**👉 Leia isto para entender a estrutura de dados**

### 4. **API.md** - Endpoints e Integração
Contém:
- Autenticação (Login Paciente/Médico)
- Endpoints para Pacientes (GET, POST, PATCH)
- Endpoints para Médicos (GET, POST, PATCH)
- Endpoints para Atendimentos (GET, POST, PATCH)
- Códigos HTTP estabelecidos
- Exemplos com cURL
- Estrutura de requisição/resposta

**👉 Leia isto para integrar com a API**

---

## 🗂️ Convenções Utilizadas

### Caminhos File
- **Relativos à raiz do projeto:** `back/src/routes/login.routes.ts`
- **Variáveis ambientais:** `$DATABASE_URL`

### Comandos Shell
- Prefixados com `$` para indicar shell command
- Exemplo: `$ npm install`

### Código
- Blocos marcados com linguagem (json, typescript, bash, etc.)
- Sintaxe destacada para legibilidade

### Links
- Referências cruzadas entre documentos
- Links para arquivos específicos quando necessário

### Ícones
- ✅ Implementado / Funciona
- ❌ Não implementado / Erro
- ⚠️ Aviso ou atenção necessária
- 📝 Nota importante
- 🚀 Performance / Otimização

---

## 🔄 Últimas Atualizações

### v1.2 (18 de Abril de 2026)

#### ✅ Adicionado
- Autenticação com bcrypt (10 salt rounds)
- Endpoints de Login (`/login/paciente`, `/login/medico`)
- Endpoints de Atendimento completos (GET, POST, PATCH)
- Campo `prescricao` no modelo Atendimento
- Proteção de rotas no Frontend (componente `Protegida.tsx`)
- Página de Login com seleção de tipo de usuário
- Validação de duplicatas (CPF, Email) com erro 409

#### 📝 Atualizado
- Schema.prisma com nuevo campo `prescricao`
- Rotas agora com tratamento de erros robusto
- Tipos de dados (telefone Médico agora é String)
- Página de login.tsx com melhor UX

#### 📚 Documentação
- API.md completamente reformulado com todos os endpoints
- ARCHITECTURE.md com seção de rotas Frontend
- DATABASE.md atualizado com novos campos e relacionamentos
- Este README.md melhorado com organização

---

## 🛠️ Contribuindo

1. Leia a documentação relevante
2. Crie uma branch para sua feature
3. Faça as alterações
4. Atualize a documentação correspondente
5. Abra um Pull Request

---

## ❓ Dúvidas Frequentes

**P: Por onde começo?**
A: Leia `SETUP.md` para instalar, depois `ARCHITECTURE.md` para entender a estrutura.

**P: Como autenticar na API?**
A: Veja a seção de Login em `API.md`. A autenticação é via POST com email/senha.

**P: Senhas estão seguras?**
A: Sim! Estão hashadas com bcrypt. Veja `DATABASE.md` → Considerações de Segurança.

**P: Posso usar JWT?**
A: Está em desenvolvimento. Veja `API.md` → Próximas Implementações.

---

## 📞 Suporte

Para problemas:
1. Consulte o `SETUP.md` → Problemas Comuns
2. Verifique os logs do servidor (`npm run dev` em cada pasta)
3. Consulte a `API.md` para respostas de erro

---

## 📄 Licença

[Adicione informação de licença se aplicável]

Para sugestões de melhoria na documentação, consulte o README principal.