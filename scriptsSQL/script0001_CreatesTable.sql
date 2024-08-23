--PostGREE
create table
  public.usuario (
    usuarioid serial not null,
    nome character varying(200) not null,
    tipo character varying null,
    localizacao character varying(200) null,
    descricao character varying(2000) null,
    zap character varying null,
    insta character varying null,
    face character varying null,
    twitter character varying null,
    foto character varying null,
    "Senha" character varying not null,
    "Email" character varying not null,
    constraint usuario_pkey primary key (usuarioid),
    constraint usuario_Email_key unique ("Email")
  ) tablespace pg_default;

--Create table Categoria
CREATE TABLE Categoria(
    Texto VARCHAR(100) PRIMARY KEY
);

--Create table Obra
CREATE TABLE Obra(
    ObraId INTEGER PRIMARY KEY,
    Titulo VARCHAR(200) NULL,
    Descricao VARCHAR(2000) NULL,
    UsuarioId INTEGER NOT NULL,
    Categoria VARCHAR(100) NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(UsuarioId)
    FOREIGN KEY (Categoria) REFERENCES Categoria(Texto)
);

CREATE TABLE Img( --imgs associadas a obra
    ImgId INTEGER PRIMARY KEY,
    Foto VARCHAR NOT NULL,
    ObraId INTEGER NOT NULL, --obra da imagem
    FOREIGN KEY (ObraId) REFERENCES Obra(ObraId)
);

--Create table Tag
CREATE TABLE Tag(
    Texto VARCHAR(100) PRIMARY KEY,
    ObraId INTEGER NOT NULL,
    FOREIGN KEY (ObraId) REFERENCES Obra(ObraId)
);

--Create table Mensagens
CREATE TABLE Mensagem(
    MensagemId INTEGER PRIMARY KEY,   
    Conteudo VARCHAR NOT NULL,
    UsuarioOrigemId INTEGER NOT NULL,
    UsuarioDestinoId INTEGER NULL, 
    ObraId INTEGER NULL, --obra e origem são nulos para no codigo identifcar se a menssagem é para um post ou para um usuario
    FOREIGN KEY (UsuarioOrigemId) REFERENCES Usuario(UsuarioId),
    FOREIGN KEY (UsuarioDestinoId) REFERENCES Usuario(UsuarioId),
    FOREIGN KEY (ObraId) REFERENCES Obra(ObraId)
);


--enums/select
create table  public.pais (
  nome character varying(200) not null,
  constraint pais_pkey primary key (nome)
);
INSERT INTO public.pais (nome) VALUES ('Brasil');

CREATE TABLE public.estado (
    nome character varying(200) not null,
    CONSTRAINT estado_pkey PRIMARY KEY (nome)
);

CREATE TABLE public.cidade (
    nome character varying(200) not null,
    CONSTRAINT cidade_pkey PRIMARY KEY (nome)
);


create table public.especializacao (
    nome character varying(200) not null,
    constraint espicializacao_pkey primary key (nome)
); 


INSERT INTO public.estado (nome) VALUES
('AC'),  -- Acre
('AL'),  -- Alagoas
('AM'),  -- Amazonas
('BA'),  -- Bahia
('CE'),  -- Ceará
('ES'),  -- Espírito Santo
('GO'),  -- Goiás
('MA'),  -- Maranhão
('MT'),  -- Mato Grosso
('MS'),  -- Mato Grosso do Sul
('MG'),  -- Minas Gerais
('PA'),  -- Pará
('PB'),  -- Paraíba
('PR'),  -- Paraná
('PE'),  -- Pernambuco
('PI'),  -- Piauí
('RJ'),  -- Rio de Janeiro
('RN'),  -- Rio Grande do Norte
('RS'),  -- Rio Grande do Sul
('RO'),  -- Rondônia
('RR'),  -- Roraima
('SC'),  -- Santa Catarina
('SP'),  -- São Paulo
('SE'),  -- Sergipe
('TO'),  -- Tocantins
('DF');  -- Distrito Federal

INSERT INTO public.cidade (nome) VALUES
('São Paulo'),
('Rio de Janeiro'),
('Salvador'),
('Fortaleza'),
('Belo Horizonte'),
('Brasília'),
('Manaus'),
('Curitiba'),
('Recife'),
('Porto Alegre'),
('Belém'),
('Goiânia'),
('São Luís'),
('Maceió'),
('Natal'),
('João Pessoa'),
('Teresina'),
('Campo Grande'),
('São Bernardo do Campo'),
('São José dos Campos'),
('Uberlândia'),
('Sorocaba'),
('Contagem'),
('Aracaju'),
('Feira de Santana'),
('Joinville'),
('Jaboatão dos Guararapes'),
('Londrina'),
('Niterói'),
('Santos'),
('Maua'),
('Diadema'),
('Canoas'),
('Blumenau'),
('Pelotas'),
('Vila Velha'),
('Nova Iguaçu'),
('Volta Redonda'),
('Carapicuíba'),
('Guarulhos'),
('São José do Rio Preto'),
('Itajaí'),
('Presidente Prudente'),
('Ponta Grossa'),
('Cuiabá'),
('Campo Largo'),
('Campos dos Goytacazes'),
('Taubaté'),
('Caxias do Sul'),
('São Carlos'),
('Lajeado'),
('Santa Maria'),
('Araxá'),
('Ribeirão Preto'),
('Uberaba'),
('Juiz de Fora'),
('Petrolina'),
('Mogi das Cruzes'),
('Marília'),
('Bauru'),
('Serrana'),
('Palmas'),
('Varginha'),
('Itapecerica da Serra'),
('Tatuí'),
('São João Nepomuceno'),
('Arujá'),
('São Vicente'),
('Montes Claros'),
('Barra Mansa'),
('Guarujá'),
('Cabo Frio'),
('Santos Dumont'),
('Laguna'),
('Araçatuba'),
('São Sebastião'),
('Ubá'),
('Cascavel'),
('Itaúna'),
('Ribeirão das Neves'),
('Andradina'),
('Colatina'),
('Sorriso'),
('Maracanaú'),
('Rio Branco'),
('Barretos'),
('Catanduva'),
('Guaratinguetá'),
('Dourados'),
('São João da Boa Vista'),
('Guapimirim'),
('Barra do Garças'),
('Araraquara'),
('Assis'),
('Bragança Paulista');
INSERT INTO public.especializacao (nome) VALUES
('Artista Digital'),
('Artista de Aquarela'),
('Artista de Papel'),
('Ilustrador de Quadrinhos'),
('Ilustrador de Animes'),
('Ilustrador de Cartoons');
