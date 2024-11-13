# Pasta prisma
Nela fica toda a estrutura do ORM utilizado, o [Prisma](https://www.prisma.io/docs). PAra que a API consiga se conectar com o banco de dados, essa ORM precisa ser iniciada(ta no final do arquivo o comando).

### Pastas

Pasta | Descrição 
:---- | :--- 
[migrations](prisma/migrations) | Responsavel por conter o codigo SQL gerado a partir do esquema.

Existem duas pastas por que foi usado 2 bancos, SQLite para desenvolvimento e PostGreSQL para colocar no Vercel. Por isso para que possamos desenvolver temos que renomear a migrations para migrations_postgre e, depois renomear a migrations_sqlite para somente migrations.

É importante, quando desenvolver não enviar para o git a pasta sqlite como principal. Sempre antes do push renomeie a sqlite para migrations_sqlite e a do postgre para migrations.

### Arquivos importantes
Arquivo | Descrição 
:---- | :--- 
[schema.prisma](prisma/schema.prisma) | Arquivo principal do Prisma, e onde tem o tipo de sql do banco e é responsavel por conter a estrutura do banco em código. É  apartir dessa estrutura em que é feito o banco.
[seed.ts](prisma/seed.ts) | Arquivo feito para o caso do banco precisar ser a pagado conseguirmos popular as tabelas que servirão como select(Cidade,Estado,Categorias, ...).

### .env
É o arquivo que fica na raiz do repositorio/projeto, aqui que fica a URL do banco em desenvolvimento vai ficar, ou seja, é aqui que definimos a qual banco vamos nos conectar, que no caso, vai ser o sqlite.

Lembrando que ele é um arquivo que tem que estar escrito da maneira correta para o valor ser usado. Então caso esteja com preguiça de copiar o envCopia, colar e depois renomear para .env, é so criuar um arquivo chamado .env com esse conteudo:
``` bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

### schema.prisma
O que vai definir o tipo de SQL usado é o provider do schema, que no nosso caso devera ser mudado conforme a situação(desenvolvimento com sqlite ou produção com postgresql). É só mudar o valor para "sqlite" ou "postgresql"
``` javascript
// é com o clietne que conseguimos acessar o banco e disponibilizamos ele á nossa API Nest
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // valor retirado do .env na raiz do projeto
}
```

Como eu disse é aqui que é definido o banco tambem, então para manipular é só usar a documentação do Prisma e se virar. Mas só mostrando um exemplo com codigo de uma tabela.

``` javascript
model TipoArtista { //model indica tabela, TipoArtista nome da tabela
  nome String @id  // nomeColuna tipoColuna pkOuNao (consulte documentação para saber cada coisa)
  usuarios Usuario[]
}
```

### Padrões que eu tento seguir no esquema

- #### Nomes em português
Geralmente quando eu crio uma função, ou não fico com preguiça de editar o nome dos gerados automaticamente com o comando de criação de modulo, eu coloco o nome em português

- #### Escrita do Nome de Tabelas em Pascal Case
cada palavra tem sua inicial Maiuscula

- #### Escrita do Nome de Colunas com todas as letras minusculas
tudo junto sem maiusculas

### Como Usar o seed.ts
basta ir no terminal e rodar o seguinte comando:

``` bash
npm run popula-enuns
```

### Iniciar
Para que a API Nest funcione é necessario usar, após o ```npm i``` o comando ```npx prisma migrate dev``` para inicair o Prisma e, assim, fazer com que a API se conecte com o banco.

Lembrando que para iniciar o schema e a pasta tem que estar ajustados corretamente.

##
![Node](https://img.shields.io/badge/Node%20Js-white?style=for-the-badge&logo=nodedotjs&logoColor=5FA04E)
![Prisma](https://img.shields.io/badge/Prisma-white?style=for-the-badge&logo=prisma&logoColor=2D3748)
