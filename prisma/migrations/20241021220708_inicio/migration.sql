-- CreateTable
CREATE TABLE "TipoArtista" (
    "nome" TEXT NOT NULL,

    CONSTRAINT "TipoArtista_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "Localizacao" (
    "id" SERIAL NOT NULL,
    "usuarioid" INTEGER NOT NULL,
    "cidadeid" INTEGER NOT NULL,
    "estadoid" INTEGER NOT NULL,

    CONSTRAINT "Localizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estadoid" INTEGER NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
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
    "imagem" BYTEA,
    "imagemtipo" TEXT,
    "banner" BYTEA,
    "bannertipo" TEXT,
    "cor1" TEXT,
    "cor2" TEXT,
    "cor3" TEXT,
    "cor4" TEXT,
    "entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "usuarioid" INTEGER NOT NULL,
    "categoriaid" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "imagem" BYTEA NOT NULL,
    "imagemtipo" TEXT NOT NULL,
    "sensivel" BOOLEAN NOT NULL DEFAULT false,
    "rascunho" BOOLEAN NOT NULL DEFAULT false,
    "excluido" BOOLEAN NOT NULL DEFAULT false,
    "entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Processo" (
    "id" SERIAL NOT NULL,
    "postid" INTEGER NOT NULL,
    "imagem" BYTEA,
    "imagemtipo" TEXT,

    CONSTRAINT "Processo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "Tag" (
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "PostTag" (
    "postid" INTEGER NOT NULL,
    "tagid" TEXT NOT NULL,

    CONSTRAINT "PostTag_pkey" PRIMARY KEY ("postid","tagid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Localizacao_usuarioid_key" ON "Localizacao"("usuarioid");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- AddForeignKey
ALTER TABLE "Localizacao" ADD CONSTRAINT "Localizacao_cidadeid_fkey" FOREIGN KEY ("cidadeid") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localizacao" ADD CONSTRAINT "Localizacao_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localizacao" ADD CONSTRAINT "Localizacao_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_tipoid_fkey" FOREIGN KEY ("tipoid") REFERENCES "TipoArtista"("nome") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoriaid_fkey" FOREIGN KEY ("categoriaid") REFERENCES "Categoria"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processo" ADD CONSTRAINT "Processo_postid_fkey" FOREIGN KEY ("postid") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagid_fkey" FOREIGN KEY ("tagid") REFERENCES "Tag"("nome") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postid_fkey" FOREIGN KEY ("postid") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
