/*
  Warnings:

  - Made the column `imagem` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagemtipo` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioid" INTEGER NOT NULL,
    "categoriaid" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "imagem" BLOB NOT NULL,
    "imagemtipo" TEXT NOT NULL,
    "sensivel" BOOLEAN NOT NULL DEFAULT false,
    "rascunho" BOOLEAN NOT NULL DEFAULT false,
    "excluido" BOOLEAN NOT NULL DEFAULT false,
    "entrada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_categoriaid_fkey" FOREIGN KEY ("categoriaid") REFERENCES "Categoria" ("nome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("categoriaid", "descricao", "entrada", "excluido", "id", "imagem", "imagemtipo", "rascunho", "titulo", "usuarioid") SELECT "categoriaid", "descricao", "entrada", "excluido", "id", "imagem", "imagemtipo", "rascunho", "titulo", "usuarioid" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
