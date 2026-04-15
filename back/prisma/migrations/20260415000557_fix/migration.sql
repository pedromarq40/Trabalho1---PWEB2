/*
  Warnings:

  - Added the required column `pescricao` to the `Atendimento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Atendimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medicoId" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "pescricao" TEXT NOT NULL,
    CONSTRAINT "Atendimento_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atendimento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Atendimento" ("id", "medicoId", "pacienteId") SELECT "id", "medicoId", "pacienteId" FROM "Atendimento";
DROP TABLE "Atendimento";
ALTER TABLE "new_Atendimento" RENAME TO "Atendimento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
