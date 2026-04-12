# API - MedSync

**Base URL:** `http://localhost:3000`

## Pacientes

| Método | Endpoint | Descrição | Exemplo |
|--------|----------|-----------|---------|
| GET | `/paciente/` | Lista todos os pacientes | `[]` |
| GET | `/paciente/:id` | Busca paciente por ID | `{id:1, nome:"João"}` |
| POST | `/paciente/` | Cria novo paciente | `{"nome":"João", "cpf":"123"}` |

## Médicos

| Método | Endpoint | Descrição | Exemplo |
|--------|----------|-----------|---------|
| GET | `/medico/` | Lista todos os médicos | `[]` |
| GET | `/medico/:id` | Busca médico por ID | `{id:1, nome:"Dr. Maria"}` |
| POST | `/medico/` | Cria novo médico | `{"nome":"Dr. Maria", "especializacao":"Cardiologia"}` |

## Códigos de Status
- `200`: Sucesso
- `201`: Criado
- `500`: Erro
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

**Resposta de Sucesso (200):**
```json
{
  "mensagem": "Médico criado com sucesso"
}
```

## Códigos de Status

- `200`: Sucesso
- `201`: Criado com sucesso
- `500`: Erro interno do servidor

## Autenticação

Atualmente, a API não implementa autenticação. As senhas são armazenadas em texto plano (não recomendado para produção).

## Próximas Implementações

- Autenticação JWT
- Validação de entrada
- Endpoints para atendimentos
- Middleware de autenticação