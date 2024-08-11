--Create table Usuario
CREATE TABLE Usuario(
    UsuarioId INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NULL,
    Senha TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Tipo TEXT NULL,
    Localizacao TEXT NULL,
    Descricao TEXT NULL,
    Zap TEXT NULL,
    Insta TEXT NULL,
    Face TEXT NULL,
    Twitter TEXT NULL,
    Foto TEXT NULL
);

--Create table Categoria
CREATE TABLE Categoria(
    Texto TEXT PRIMARY KEY
);

--Create table Obra
CREATE TABLE Obra(
    ObraId INTEGER PRIMARY KEY AUTOINCREMENT,
    Titulo TEXT NULL,
    Descricao TEXT NULL,
    UsuarioId INTEGER NOT NULL,
    Categoria TEXT NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(UsuarioId),
    FOREIGN KEY (Categoria) REFERENCES Categoria(Texto)
);

--Create table Img (imgs associadas a obra)
CREATE TABLE Img(
    ImgId INTEGER PRIMARY KEY AUTOINCREMENT,
    Foto TEXT NOT NULL,
    ObraId INTEGER NOT NULL,
    FOREIGN KEY (ObraId) REFERENCES Obra(ObraId)
);

--Create table Tag
CREATE TABLE Tag(
    Texto TEXT PRIMARY KEY,
    ObraId INTEGER NOT NULL,
    FOREIGN KEY (ObraId) REFERENCES Obra(ObraId)
);

--Create table Mensagens
CREATE TABLE Mensagem(
    MensagemId INTEGER PRIMARY KEY AUTOINCREMENT,
    Conteudo TEXT NOT NULL,
    UsuarioOrigemId INTEGER NOT NULL,
    UsuarioDestinoId INTEGER NULL,
    ObraId INTEGER NULL,
    FOREIGN KEY (UsuarioOrigemId) REFERENCES Usuario(UsuarioId),
    FOREIGN KEY (UsuarioDestinoId) REFERENCES Usuario(UsuarioId),
    FOREIGN KEY (ObraId) REFERENCES Obra(ObraId)
);

--enums/select
CREATE TABLE Pais (
    Nome TEXT PRIMARY KEY
);

INSERT INTO Pais (Nome) VALUES ('Brasil');

CREATE TABLE Estado (
    Nome TEXT PRIMARY KEY
);

CREATE TABLE Cidade (
    Nome TEXT PRIMARY KEY
);

CREATE TABLE Especializacao (
    Nome TEXT PRIMARY KEY
);

-- Inserts
INSERT INTO Estado (Nome) VALUES
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

INSERT INTO Cidade (Nome) VALUES
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

INSERT INTO Especializacao (Nome) VALUES
('Artista Digital'),
('Artista de Aquarela'),
('Artista de Papel'),
('Ilustrador de Quadrinhos'),
('Ilustrador de Animes'),
('Ilustrador de Cartoons');
