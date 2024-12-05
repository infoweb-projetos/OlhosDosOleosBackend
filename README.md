# Olhos dos Óleos API
## Passo a passo para Rodar
- No repositorio tem um envCopia, voce tem que copiar esse arquivo e renomear essa copia para .env
- Aapós criar um .env voce deve apagar as duas pastas com nome de migrations e migrations_sql. Essas duas pastas estão na pasta prisma
- Feito esses dois passos agora voce precisa acessar a pasta do REPOSITORIO pelo terminal e utilizar os seguintes comandos( que não estão com jogo da velha(#) antes:

``` bash
# Você precisar estar na pasta do REPOSITORIO, ra raiz, ou seja, não pode estar dentro de nenhuma pasta dentro do repositorio
# Instala tudo necessario para o projeto
npm i
```
``` bash
# Cria a primeira migração, ou seja, monta a estrutura do banco de dados e inicia o prisma para poder manipular esse banco 
npx prisma migrate dev init
# Pode aparecer uma pergunta (Y/n), voce coloca Y e tecla enter
# Pode aparecer para voce definir um nome, so digitar algum nome e dar enter
```
``` bash
# Inserir nas tabelas conteudos dos select do site, categorias, estados, ...
npm run popula-enuns
```
``` bash
# Com esses comandos anteriores, agora pode Rodar no modo Desenvolvedor
npm run start:dev
```
> Para testar na escola, no Workspace do Git, lembrar de tornar as visibilidade da porta publica para p frpnt conseguir acessar. So ir na seção "Portas" e clicar na linha desejada com botão direito na porta deseja que vai aprecer uma opção de visibilidade.
> Caso a API pare de responder é so mudar a porta, valor da const port, no src/main.ts e rodar denovo.
##
![Node](https://img.shields.io/badge/Node%20Js-white?style=for-the-badge&logo=nodedotjs&logoColor=5FA04E)
![Nest](https://img.shields.io/badge/Nest%20Js-white?style=for-the-badge&logo=nestjs&logoColor=E0234E)
![Prisma](https://img.shields.io/badge/Prisma-white?style=for-the-badge&logo=prisma&logoColor=2D3748)
