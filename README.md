# Olhos dos Óleos API
``` bash
# Execute na Raiz do Repositorio, não precisa dar CD
# Instala tudo necessario para o projeto
npm i

# Tenta conectar o Prisma com Banco e incia o PrismaCliente(Usado para operações no Banco) 
npx prisma migrate dev

# Roda no modo Desenvolvedor
npm run start:dev
```
> No Workspace lembrar de tornar as visibilidade da porta publica para p frpnt conseguir acessar. So ir na seção "Portas" e clicar na linha desejada com botão direito na porta deseja que vai aprecer uma opção de visibilidade.
> Caso a API pare de responder é so mudar a porta, valor da const port, no src/main.ts e rodar denovo.
##
![Nest](https://img.shields.io/badge/Node%20Js-white?style=for-the-badge&logo=nodedotjs&logoColor=5FA04E)
![Nest](https://img.shields.io/badge/Nest%20Js-white?style=for-the-badge&logo=nestjs&logoColor=E0234E)
![Prisma](https://img.shields.io/badge/Prisma-white?style=for-the-badge&logo=prisma&logoColor=2D3748)
![Passport](https://img.shields.io/badge/Passport-white?style=for-the-badge&logo=passport&logoColor=34E27A)
![Railway](https://img.shields.io/badge/Railway-white?style=for-the-badge&logo=railway&logoColor=0B0D0E)
