/*
  Warnings:

  - You are about to drop the column `localizacao` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Estado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "estadoid" INTEGER NOT NULL,
    CONSTRAINT "Cidade_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "Estado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoArtista" (
    "nome" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "cidadeid" INTEGER,
    "insta" TEXT,
    "youtube" TEXT,
    "zap" TEXT,
    "face" TEXT,
    "tipoid" TEXT,
    "biografia" TEXT,
    "imagem" BLOB,
    CONSTRAINT "Usuario_cidadeid_fkey" FOREIGN KEY ("cidadeid") REFERENCES "Cidade" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Usuario_tipoid_fkey" FOREIGN KEY ("tipoid") REFERENCES "TipoArtista" ("nome") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("biografia", "email", "face", "id", "imagem", "insta", "nome", "senha", "usuario", "youtube", "zap") SELECT "biografia", "email", "face", "id", "imagem", "insta", "nome", "senha", "usuario", "youtube", "zap" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
