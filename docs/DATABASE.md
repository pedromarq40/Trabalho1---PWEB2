# Esquema do Banco de Dados - MedSync

## Visão Geral

O MedSync utiliza SQLite como banco de dados, gerenciado pelo Prisma ORM. O esquema define três modelos principais: Paciente, Médico e Atendimento.

## Modelo: Paciente

Armazena informações dos pacientes cadastrados no sistema.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | Int | Sim | Chave primária, autoincremento |
| `nome` | String | Sim | Nome completo do paciente |
| `cpf` | String | Sim | CPF único do paciente |
| `email` | String | Sim | Email único do paciente |
| `telefone` | String | Não | Número de telefone |
| `altura` | Decimal | Não | Altura em metros |
| `peso` | Decimal | Não | Peso em quilogramas |
| `dataDeNascimento` | DateTime | Não | Data de nascimento |
| `dataCriacao` | DateTime | Sim | Timestamp de criação (padrão: now()) |
| `senha` | String | Sim | Senha hashada com bcrypt |

**Índices Únicos:**
- `cpf`
- `email`

**Relacionamentos:**
- Um `Paciente` pode ter muitos `Atendimento`

## Modelo: Médico

Armazena informações dos profissionais médicos.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | Int | Sim | Chave primária, autoincremento |
| `nome` | String | Sim | Nome completo do médico |
| `email` | String | Sim | Email único do médico |
| `cpf` | String | Sim | CPF único do médico |
| `telefone` | String | Sim | Número de telefone |
| `especializacao` | String | Sim | Especialização médica |
| `dataDeNascimento` | DateTime | Sim | Data de nascimento |
| `dataCriacao` | DateTime | Sim | Timestamp de criação (padrão: now()) |
| `senha` | String | Sim | Senha hashada com bcrypt |

**Índices Únicos:**
- `email`
- `cpf`

**Relacionamentos:**
- Um `Medico` pode ter muitos `Atendimento`

## Modelo: Atendimento

Relaciona médicos e pacientes para agendamentos de consultas e prescrições.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | Int | Sim | Chave primária, autoincremento |
| `medicoId` | Int | Sim | Referência ao ID do médico (FK) |
| `pacienteId` | Int | Sim | Referência ao ID do paciente (FK) |
| `prescricao` | String | Sim | Prescrição médica do atendimento |

**Relacionamentos:**
- `medicoId` → `Medico.id` (Cascade Delete)
- `pacienteId` → `Paciente.id` (Cascade Delete)
- Um `Medico` pode ter muitos `Atendimento`
- Um `Paciente` pode ter muitos `Atendimento`

## Diagrama ER

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Paciente  │     │  Atendimento │     │   Médico    │
├─────────────┤     ├──────────────┤     ├─────────────┤
│ id (PK)     │◄────┤ pacienteId   │     │ id (PK)     │
│ nome        │     │ medicoId ────►     │ nome        │
│ cpf (UQ)    │     │ id (PK)      │     │ email       │
│ email (UQ)  │     └──────────────┘     │ cpf         │
│ telefone    │                          │ telefone    │
│ altura      │                          │ especializ. │
│ peso        │                          │ dataNasc.   │
│ dataNasc.   │                          │ dataCriacao │
│ dataCriacao │                          │ senha       │
│ senha       │                          └─────────────┘
└─────────────┘
```

## Configuração

O banco é configurado via variável de ambiente:

```env
DATABASE_URL="file:./dev.db"
```

## Considerações de Segurança

- ✅ As senhas estão hashadas com bcrypt (salt round: 10)
- ✅ CPF e Email são únicos e não duplicáveis
- Implementar validação de entrada mais robusta
- Implementar soft deletes para dados sensíveis
- Adicionar autenticação JWT para sessões
- Implementar rate limiting em endpoints de autenticação