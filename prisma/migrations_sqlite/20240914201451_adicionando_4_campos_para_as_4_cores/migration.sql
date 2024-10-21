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
    "estadoid" INTEGER,
    "insta" TEXT,
    "youtube" TEXT,
    "zap" TEXT,
    "face" TEXT,
    "tipoid" TEXT,
    "biografia" TEXT,
    "imagem" BLOB,
    "cor1" TEXT,
    "cor2" TEXT,
    "cor3" TEXT,
    "cor4" TEXT,
    CONSTRAINT "Usuario_cidadeid_fkey" FOREIGN KEY ("cidadeid") REFERENCES "Cidade" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Usuario_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "Estado" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Usuario_tipoid_fkey" FOREIGN KEY ("tipoid") REFERENCES "TipoArtista" ("nome") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("biografia", "cidadeid", "email", "face", "id", "imagem", "insta", "nome", "senha", "tipoid", "usuario", "youtube", "zap") SELECT "biografia", "cidadeid", "email", "face", "id", "imagem", "insta", "nome", "senha", "tipoid", "usuario", "youtube", "zap" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
