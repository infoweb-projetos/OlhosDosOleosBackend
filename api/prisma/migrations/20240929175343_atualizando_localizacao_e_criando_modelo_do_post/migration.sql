/*
  Warnings:

  - You are about to drop the column `cidadeid` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `estadoid` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Localizacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioid" INTEGER NOT NULL,
    "cidadeid" INTEGER NOT NULL,
    "estadoid" INTEGER NOT NULL,
    CONSTRAINT "Localizacao_cidadeid_fkey" FOREIGN KEY ("cidadeid") REFERENCES "Cidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Localizacao_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "Estado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Localizacao_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioid" INTEGER NOT NULL,
    "categoriaid" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" BLOB,
    "imagemtipo" TEXT,
    "rascunho" BOOLEAN NOT NULL DEFAULT false,
    "excluido" BOOLEAN NOT NULL DEFAULT false,
    "entrada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_categoriaid_fkey" FOREIGN KEY ("categoriaid") REFERENCES "Categoria" ("nome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Processo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postid" INTEGER NOT NULL,
    "imagem" BLOB,
    "imagemtipo" TEXT,
    CONSTRAINT "Processo_postid_fkey" FOREIGN KEY ("postid") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categoria" (
    "nome" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Tag" (
    "nome" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "PostTag" (
    "postid" INTEGER NOT NULL,
    "tagid" TEXT NOT NULL,

    PRIMARY KEY ("postid", "tagid"),
    CONSTRAINT "PostTag_tagid_fkey" FOREIGN KEY ("tagid") REFERENCES "Tag" ("nome") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PostTag_postid_fkey" FOREIGN KEY ("postid") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "localizacaoid" INTEGER,
    "insta" TEXT,
    "youtube" TEXT,
    "zap" TEXT,
    "face" TEXT,
    "tipoid" TEXT,
    "biografia" TEXT,
    "imagem" BLOB,
    "imagemtipo" TEXT,
    "banner" BLOB,
    "bannertipo" TEXT,
    "cor1" TEXT,
    "cor2" TEXT,
    "cor3" TEXT,
    "cor4" TEXT,
    "entrada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Usuario_tipoid_fkey" FOREIGN KEY ("tipoid") REFERENCES "TipoArtista" ("nome") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("banner", "bannertipo", "biografia", "cor1", "cor2", "cor3", "cor4", "email", "face", "id", "imagem", "imagemtipo", "insta", "nome", "senha", "tipoid", "usuario", "youtube", "zap") SELECT "banner", "bannertipo", "biografia", "cor1", "cor2", "cor3", "cor4", "email", "face", "id", "imagem", "imagemtipo", "insta", "nome", "senha", "tipoid", "usuario", "youtube", "zap" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Localizacao_usuarioid_key" ON "Localizacao"("usuarioid");
