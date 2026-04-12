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
| `telefone` | BigInt | Não | Número de telefone |
| `altura` | Decimal | Não | Altura em metros |
| `peso` | Decimal | Não | Peso em quilogramas |
| `dataDeNascimento` | DateTime | Não | Data de nascimento |
| `dataCriacao` | DateTime | Sim | Timestamp de criação (padrão: now()) |
| `senha` | String | Sim | Senha de acesso |

**Índices Únicos:**
- `cpf`
- `email`
- `telefone` (se fornecido)

## Modelo: Médico

Armazena informações dos profissionais médicos.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | Int | Sim | Chave primária, autoincremento |
| `nome` | String | Sim | Nome completo do médico |
| `email` | String | Sim | Email do médico |
| `cpf` | String | Sim | CPF do médico |
| `telefone` | String | Sim | Número de telefone |
| `especializacao` | String | Sim | Especialização médica |
| `dataDeNascimento` | DateTime | Sim | Data de nascimento |
| `dataCriacao` | DateTime | Sim | Timestamp de criação (padrão: now()) |
| `senha` | String | Sim | Senha de acesso |

**Índices Únicos:**
- Nenhum definido além da chave primária

## Modelo: Atendimento

Relaciona médicos e pacientes para agendamentos de consultas.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | Int | Sim | Chave primária, autoincremento |
| `medicoId` | Int | Sim | Referência ao ID do médico |
| `pacienteId` | Int | Sim | Referência ao ID do paciente |

**Relacionamentos:**
- `medicoId` → `Medico.id`
- `pacienteId` → `Paciente.id`

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

- As senhas estão armazenadas em texto plano (não recomendado)
- Não há criptografia de dados sensíveis
- Implementar hash de senhas (bcrypt) em produção
- Adicionar validações de entrada
- Implementar soft deletes para dados sensíveis