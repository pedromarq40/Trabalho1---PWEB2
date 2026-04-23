# API - MedSync

**Base URL:** `http://localhost:3000`

## 📋 Visão Geral

A API MedSync fornece endpoints seguindo padrão REST para gerenciamento de pacientes, médicos, autenticação e atendimentos. Todas as requisições e respostas utilizam JSON.

## 🔐 Autenticação

Atualmente implementada com bcrypt para hash de senhas. JWT está em desenvolvimento.

### Sentinelas de Status
- `200`: Sucesso em GET/POST/PATCH
- `201`: Criado com sucesso
- `400`: Dados inválidos
- `401`: Não autenticado / Credenciais inválidas
- `409`: Conflito (CPF/Email já cadastrado)
- `404`: Não encontrado
- `500`: Erro interno do servidor

---

## 👥 Pacientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/paciente/` | Lista todos os pacientes |
| GET | `/paciente/:id` | Busca paciente por ID |
| POST | `/paciente/` | Cria novo paciente |
| PATCH | `/paciente/:id` | Atualiza dados do paciente |

### POST `/paciente/` - Criar Paciente

**Request:**
```json
{
  "nome": "João Silva",
  "cpf": "12345678900",
  "email": "joao@email.com",
  "telefone": "11987654321",
  "altura": 1.75,
  "peso": 80,
  "dataDeNascimento": "1990-05-10",
  "senha": "password123"
}
```

**Response (201):**
```json
{
  "mensagem": "Paciente criado com sucesso"
}
```

**Error Responses:**
- `409`: `{"error": "Este CPF ou Email já está cadastrado!"}`
- `400`: `{"error": "Dados inválidos ou campos faltando"}`

---

## 👨‍⚕️ Médicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/medico/` | Lista todos os médicos |
| GET | `/medico/:id` | Busca médico por ID |
| POST | `/medico/` | Cria novo médico |
| PATCH | `/medico/:id` | Atualiza dados do médico |

### POST `/medico/` - Criar Médico

**Request:**
```json
{
  "nome": "Dr. Maria Santos",
  "email": "maria@medico.com",
  "cpf": "98765432100",
  "telefone": "11988888888",
  "especializacao": "Cardiologia",
  "dataDeNascimento": "1980-05-15",
  "senha": "password123"
}
```

**Response (200):**
```json
{
  "mensagem": "Médico criado com sucesso"
}
```

**Error Responses:**
- `409`: `{"error": "Já existe cpf ou email cadastrado"}`
- `400`: `{"error": "Dados inválidos ou campos faltando"}`

---

## 🔐 Login

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/login/paciente` | Autentica um paciente |
| POST | `/login/medico` | Autentica um médico |

### POST `/login/paciente` - Login de Paciente

**Request:**
```json
{
  "email": "joao@email.com",
  "senha": "password123"
}
```

**Response (200) - Sucesso:**
```json
{
  "mensagem": "Login Efetuado com Sucesso!"
}
```

**Response (401) - Erro:**
```json
{
  "error": "Email Errado!"
}
```
ou
```json
{
  "mensagem": "Senha Errada!"
}
```

### POST `/login/medico` - Login de Médico

Mesmo formato do paciente, apenas muda o endpoint para `/login/medico`

---

## 🚪 Logout

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/logout/paciente` | Encerra a sessão do paciente |
| POST | `/logout/medico` | Encerra a sessão do médico |

### POST `/logout/paciente` - Logout de Paciente

Acionado pelo botão de logout no header do dashboard do paciente.

**Request:** _(sem body)_

**Response (200) - Sucesso:**
```json
{
  "mensagem": "Logout efetuado com sucesso!"
}
```

### POST `/logout/medico` - Logout de Médico

Acionado pelo botão de logout no header do dashboard do médico.

**Request:** _(sem body)_

**Response (200) - Sucesso:**
```json
{
  "mensagem": "Logout efetuado com sucesso!"
}
```

> ⚠️ **Nota:** Após o logout, o usuário é redirecionado para a tela de login correspondente. Com a implementação futura de JWT, este endpoint também será responsável por invalidar o token de acesso.

---

## 📅 Atendimentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/atendimento/` | Lista todos os atendimentos |
| GET | `/atendimento/:id` | Busca atendimento por ID |
| POST | `/atendimento/` | Cria novo atendimento |
| PATCH | `/atendimento/:id` | Atualiza atendimento |

### GET `/atendimento/`

**Response (200):**
```json
[
  {
    "id": 1,
    "medicoId": 1,
    "pacienteId": 1,
    "prescricao": "Repouso completo por 7 dias"
  }
]
```

### POST `/atendimento/` - Criar Atendimento

**Request:**
```json
{
  "medicoId": 1,
  "pacienteId": 1,
  "prescricao": "Tomar medicação X duas vezes ao dia"
}
```

**Response (200):**
```json
{
  "mensagem": "Atendimento criado com sucesso!"
}
```

### PATCH `/atendimento/:id` - Atualizar Atendimento

**Request:**
```json
{
  "prescricao": "Medicação atualizada: Tomar uma vez ao dia"
}
```

**Response (200):**
```json
{
  "mensagem": "Atendimento atualizado com sucesso"
}
```

---

## 📝 Exemplos com cURL

### Criar Paciente
```bash
curl -X POST http://localhost:3000/paciente/ \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678900",
    "email": "joao@email.com",
    "telefone": "11987654321",
    "altura": 1.75,
    "peso": 80,
    "dataDeNascimento": "1990-05-10",
    "senha": "password123"
  }'
```

### Login de Paciente
```bash
curl -X POST http://localhost:3000/login/paciente \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "password123"
  }'
```

### Logout de Paciente
```bash
curl -X POST http://localhost:3000/logout/paciente
```

### Logout de Médico
```bash
curl -X POST http://localhost:3000/logout/medico
```

### Criar Atendimento
```bash
curl -X POST http://localhost:3000/atendimento/ \
  -H "Content-Type: application/json" \
  -d '{
    "medicoId": 1,
    "pacienteId": 1,
    "prescricao": "Repouso e hidratação"
  }'
```

---

## 🚀 Próximas Implementações

- [ ] Autenticação JWT com tokens
- [ ] Invalidação de token no logout
- [ ] Paginação em listagens
- [ ] Filtros avançados (especialização, data, etc.)
- [ ] Soft deletes
- [ ] Rate limiting
- [ ] Documentação em Swagger/OpenAPI
