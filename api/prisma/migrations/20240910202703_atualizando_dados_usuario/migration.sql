/*
  Warnings:

  - Added the required column `usuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "localizacao" TEXT,
    "insta" TEXT,
    "youtube" TEXT,
    "zap" TEXT,
    "face" TEXT,
    "tipo" TEXT,
    "biografia" TEXT,
    "imagem" TEXT
);
INSERT INTO "new_Usuario" ("email", "id", "nome", "senha", "usuario") SELECT "email", "id", "nome", "senha", "nome" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
