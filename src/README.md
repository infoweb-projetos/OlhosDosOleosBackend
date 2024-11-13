# Pasta src
Nela fica toda a estrutura da nossa REST API com [Nest JS](https://nestjs.com/) com typescript.

### Pastas

Pasta | Descrição 
:---- | :--- 
[persistencia](src/persistencia) | Modulo responsalvel por integrar o Prisma com o projeto Nest.
[autenticacao](src/autenticacao) | Configuração da utilização basica do token e funções de autenticação basica como verificar se o Token ainda esta válido ou logar.
[jwt](src/jwt)  | uma das 2 pastas que não são modulos. Serve para configurar o Token em si.
[categoria](src/categoria), [cidade](src/cidade), [estado](src/estado) e [tipoArtista](src/tipoArtista)  | São modulos de enuns, servem para montar o select. Futuramente o admin vai ser responsavel por inserir objetos desse tipo no banco. Todos esses modulos consultam no banco e possuem tabela com mesmo nome no banco. Nesses modulos ainda não esta envolvido inserções ou updates, apenas selects.
[modelos](src/modelos)  | classes(DTOs) que não se encaixam unicamente em um modulo ou não necessitam ainda de um modulo com funções próprias. É a outra pasta que não serve como modulo.
[posts](src/posts)  e [usuarios](src/usuarios) | Modulos que envolvem a parte mais pesada da logica e as funções principais do sistema, uma vez que envolvem os posts e os usuarios no banco de dados. 
[upload](src/upload)  | Modulo que usei para aprender a utilizar imagens. Acho que pode ser retirado, mas não ta fazendo mal a ninguem.

### A estrutura basica de um modulo consiste em:

#### .module.ts
- Aqui são feito os imports de outros modulos do projeto, ou seja, e onde definimos quais funções de outros modulos esse modulo podera usar. Por exemplo, em todos que envolvem banco de dados tem um import do modulo de persistencia para conseguir acessar o ORM Prisma.
> É importante lembrar que para acessar o banco precisa ter o import do modulo do prisma(PersistenciaModule).
> Para ter acesso a autenticação é necessario o import do modulo da autenticação(AutenticacaoModule).
>
>  Usando como exemplo modulo de usuario:
> ``` javascript
> import { Module } from '@nestjs/common';
> import { UsuariosService } from './usuarios.service';
> import { UsuariosController } from './usuarios.controller';
> import { PersistenciaModule } from 'src/persistencia/persistencia.module';
> import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';
> import { JwtModule } from '@nestjs/jwt'; // Pode ser que seja necessario, mas no posts, por exemplo, não precisa
> @Module({
>   controllers: [UsuariosController],
>   imports: [PersistenciaModule, AutenticacaoModule], // Imports importantes aqui
>   providers: [UsuariosService],
> })
> export class UsuariosModule {}
> ```
> Sem o PersistenciaModule, o modulo de usuario não teria acesse ao Prisma e, consequentemente, ao Banco.
>
> Sem o AutenticacaoModule não teria validação de Token, ou seja qualquer pessoa conseguiria acessar tudo, mesmo deslogado.

#### .controller.ts
- O pontos a qual o fronte usa para se comunicar com o back, por meio do endpoint(url) sendo definido depois de um verbo relacionado a requisição(Post, Get, Patch, Delete), exemplo, no modulo de autenticação temos o ``` @Post('login') ``` que indica que a url vai vir com
- Em cada metodo dele é definido os parametros que devem vir na requisição e se ele precisa de autorização
- Aqui podem ser feito validações mais leves como verificar se todos
- É meio de campo entre a requisição e o banco(que é responsabilidade do service)
  
#### .service.ts
- Tambem chamado provedor
- Aqui é onde de fato ser executados comandos mais "sensiveis", já que é aqui que usamos o prisma para inserir, deletar, atualizar ou apenas selecionar do banco.

#### /DTO (Pasta) 
- Contem classes de apoio para montar objetos que vem do banco ou vão para o banco. COmo montar uma classe contendo dado necessario para dar update somente no banner, ou um dto com todos os dados para criar um usuario.

### Padrões que eu tento seguir

#### Nomes em português
Geralmente quando eu crio uma função, ou não fico com preguiça de editar o nome dos gerados automaticamente com o comando de criação de modulo, eu coloco o nome em português

#### Escrita em Camel Case
Primerio nome minusculo o resto dos nome com, somente, inicial maiuscula.
``` javascript
let nomeVariavel = 0;
function nomeFuncao () {[...]}
```
> OBS: se o segundo nome for maiusculo coloca tudo em maiusculo.

#### Uso do [Swagger](https://swagger.io/) 
Uso para agrupar funcionalidades com base na entidade do banco que ela representa. Usa marcadores que devem colocado no controlodar e/ou atributos de DTOs. Agrupa os endpoints(quando em um controlador) e monta DTOs em uma interface propria dele que pode ser acessada quando se roda a api e coloca no final da url /docs (definida no [main.ts](src/main.ts))

No controlador, para agrupar as funções ele usa um ApiTags do @nestjs/swagger antes do nome de alguma função.
``` javascript
import { ApiTags } from '@nestjs/swagger';
// [...]
@ApiTags('Usuario')
listarAlgo() {}
// [...]
```

No DTO ele usa ApiProperty do "@nestjs/swagger" antes do atributo para exibir o DTO na interface propria dele.
``` javascript
import { ApiProperty } from "@nestjs/swagger";

export class EditaBannerDto {
    @ApiProperty({ required: false })
    atributoUm?: string;
    // [...]
}
```

#### Comandos NPM Frequentes (Após usar ```npm i```)
- Comando para rodar API:
```bash
# Comando para rodar API
npm run start:dev
```

- Comando para criar um modulo:
```bash
# Comando para criar um modulo
nest g resource nomeDoRecurso --no-spec
# nomeDoRecurso é o nome do modulo
```

### Soluções Atuais
#### Usando Autenticação do Token
Para tornar uma função somente para pessoas logadas basta usar o ```UseGuards``` do ```'@nestjs/common'``` com as regras vindo do ```JwtAuthGuard```  do  ```'src/jwt/jwt-auth.guard'```
```javascript
//Imports
import { Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
[...]
  //Exigindo autenticação
  @ApiTags('Post')
  @Get('criar')
  @UseGuards(JwtAuthGuard)
  funcao(@Req() req: Request) {
    [...]
  }
[..]
```
O token é enviado pelo Front pelo cabeçalho da requisição. Então é possivel recuperar ele pelo header assim:
```javascript
//Imports
import { Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
[...]
  //Exigindo autenticação
  @ApiTags('Post')
  @Get('criar')
  @UseGuards(JwtAuthGuard)
  funcao(@Req() req: Request) {
    const authHeader = req.headers['authorization']; // pega cabeçalho de autorização 
    if (authHeader) { // verifica que é valido o cabeçalho de autorização
      const token = authHeader.split(' ')[1]; // pega o token encripitado
      return this.algoService.funcaoService(token)
    }
    return { message: 'Token não encontrado' };
  }
[..]
```
para desencriptar o token precisa ter acesso ao serviço do jwt e usar o verify dele. Assim:
```javascript
// Adiciona o import do JwtService
import { JwtService } from '@nestjs/jwt';
[...]
export class AlgoService {
  constructor(private algo: AlgoService, private jwt: JwtService) { } // adicione um atributo privado pro serviço
  funcaoService(token: string) {
    const tokenDescodificado = this.jwt.verify(token); // use o verify do serviço jwt instanciado
    [...]
  }
  [..]
}
```

#### Recebendo Imagens do Front
No momento fiz de duas formas diferentes o envio de multiplas imagens, ecolha a que preferir ou ache uma solução mais util. Usarei como exemplo codigo real e deixarei comentarios nele.
```javascript
  @ApiTags('Post')
  @Post('criar')
  @UseInterceptors(AnyFilesInterceptor()) // é o que permite pegar os arquivos
  @ApiConsumes('multipart/form-data') // adequa interface do swagger para o envio de imagens
  @UseGuards(JwtAuthGuard)
  Criar(@Req() req: Request, @Body() criarPost: CriarPost, @UploadedFiles() arquivos: Array<Express.Multer.File> | undefined) { //aqui é instanciado os arquivos que poderão ser recebidos
    const imagem = arquivos.find(arq => arq.fieldname === 'imagem'); // no front uma imagem recebeu o nome de imagem, e ela é unica. Entçao basta eu achar o arquivo com esse nome
    const arqprocesso = arquivos.filter(arq => arq.fieldname === 'processo');  // processo é um conjunto de imagens, então eu filtro dos arquivos enviados todos com nome processo
    const authHeader = req.headers['authorization']; 
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
      return this.postsService.criar(token, criarPost, imagem, arqprocesso)
    }
    return { message: 'Token não encontrado' };
  }
```
``` javascript
  @ApiTags('Usuario')
  @Patch('atualizar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([ // define logo o nome dos arquivos em name e a quantidade de arquivos para receber no maxCoutn
    { name: 'imagem', maxCount: 1 }, 
    { name: 'banner', maxCount: 1 }
  ]))
  @ApiConsumes('multipart/form-data')
  atualizar(@Req() req: Request, @Body() updateUsuarioDto: UpdateUsuarioDto, @UploadedFiles() files: { imagem?: Express.Multer.File[], banner?: Express.Multer.File[] }) { // instanceia arquivos em uma lista de arquivos chamada imagem e outra banner
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const imagem = files.imagem ? files.imagem[0] : null; 
      const banner = files.banner ? files.banner[0] : null;
      return this.usuariosService.atualizar(token, updateUsuarioDto, imagem, banner);
    }
    return { message: 'Token não encontrado' };
  }
```
O envio de imagens individuais é mais simples. Basta usar um FileInterceptor com o nome que o Front for Enviar. e colocar ele como uma parametro na função, como abaixo:
``` javascript
  @ApiTags('Usuario')
  @Patch('banner')
  @UseInterceptors(FileInterceptor('banner')) // captar o arquivo com nome banner
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  editarBanner(@Req() req: Request, @Body() editaBannerDto: EditaBannerDto, @UploadedFile() arq: Express.Multer.File) { // usando como parametro da função um arquivo
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.usuariosService.editarBanner(token, editaBannerDto, arq);
    }
    return { message: 'Token não encontrado' };
  }
```

Para salvar no banco é simples, voce so devera armazer o buffer(bytes da imagem) do Express.Multer.File
``` javascript
async editarBanner(token: string, usu: EditaBannerDto, banner: Express.Multer.File) {
    this.validarImagem(banner, 'banner');
    try {
      if (banner) {
        usu.banner = banner.buffer; // atribuindo o buffer a instancia do objeto
        usu.bannertipo = banner.mimetype; // atribuindo a extenção da imagem a instancia do objeto
      }
      const tokenDescodificado = this.jwt.verify(token);
      const resultado = await this.persistencia.usuario
        .update({
          where: { id: tokenDescodificado.usuario },
          data: {
            banner: usu.banner, // salvando imagem
            bannertipo: usu.bannertipo,
          },
        })
      [...]
  }
```

#### Criptografia Usada
Basta importar tudo  do 'bcrypt' e usar no service onde desejar.
Exemplo de import
``` javascript
import * as bcrypt from 'bcrypt'; 
```
Para criptogriafia um bcrypt usa um negocio chamado saltRounds(se quiser saber o que é, pesquise) para encriptografar um dado, ele tem que permancer constante em toda a aplicação então sempre que precisar de criptografia onde não existia, adicione o saltRounds = 10
``` javascript
private readonly saltRounds = 10;
```
Para encriptografar um dado basta chamar a função hash do bcrypt com o saltRounds
```javascript
 const senhaProtegida = await bcrypt.hash(usu.senha, this.saltRounds);
```
Para comparar se um dado é igual a um valor encriptografado bas usar o compere com os dois valores
```javascript
const ehSenhaValida = await bcrypt.compare(senha, usuario.senha);
```

##
![Nest](https://img.shields.io/badge/Node%20Js-white?style=for-the-badge&logo=nodedotjs&logoColor=5FA04E)
![Nest](https://img.shields.io/badge/Nest%20Js-white?style=for-the-badge&logo=nestjs&logoColor=E0234E)
![Passport](https://img.shields.io/badge/Passport-white?style=for-the-badge&logo=passport&logoColor=34E27A)
![Typescript](https://img.shields.io/badge/Typescript-FFFFFF?logo=typescript&logoColor=3178C6&style=for-the-badge)

