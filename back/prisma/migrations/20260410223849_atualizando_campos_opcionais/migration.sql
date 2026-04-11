/*
  Warnings:

  - Added the required column `nome` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" BIGINT,
    "altura" DECIMAL,
    "peso" DECIMAL,
    "dataDeNascimento" DATETIME,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Paciente" ("altura", "cpf", "dataCriacao", "dataDeNascimento", "email", "id", "peso", "telefone") SELECT "altura", "cpf", "dataCriacao", "dataDeNascimento", "email", "id", "peso", "telefone" FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente" RENAME TO "Paciente";
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");
CREATE UNIQUE INDEX "Paciente_email_key" ON "Paciente"("email");
CREATE UNIQUE INDEX "Paciente_telefone_key" ON "Paciente"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
