/*
  Warnings:

  - Added the required column `senha` to the `Medico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "especializacao" TEXT NOT NULL,
    "dataDeNascimento" DATETIME NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Medico" ("cpf", "dataCriacao", "dataDeNascimento", "email", "especializacao", "id", "nome", "telefone") SELECT "cpf", "dataCriacao", "dataDeNascimento", "email", "especializacao", "id", "nome", "telefone" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" BIGINT,
    "altura" DECIMAL,
    "peso" DECIMAL,
    "dataDeNascimento" DATETIME,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Paciente" ("altura", "cpf", "dataCriacao", "dataDeNascimento", "email", "id", "nome", "peso", "telefone") SELECT "altura", "cpf", "dataCriacao", "dataDeNascimento", "email", "id", "nome", "peso", "telefone" FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente" RENAME TO "Paciente";
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");
CREATE UNIQUE INDEX "Paciente_email_key" ON "Paciente"("email");
CREATE UNIQUE INDEX "Paciente_telefone_key" ON "Paciente"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
