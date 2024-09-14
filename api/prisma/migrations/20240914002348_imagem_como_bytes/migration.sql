/*
  Warnings:

  - You are about to alter the column `imagem` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

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
    "imagem" BLOB
);
INSERT INTO "new_Usuario" ("biografia", "email", "face", "id", "imagem", "insta", "localizacao", "nome", "senha", "tipo", "usuario", "youtube", "zap") SELECT "biografia", "email", "face", "id", "imagem", "insta", "localizacao", "nome", "senha", "tipo", "usuario", "youtube", "zap" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
