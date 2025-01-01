import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { CriarPost } from './dto/post.dto';
import { Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiTags('Post')
  @Post('criar')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  Criar(@Req() req: Request, @Body() criarPost: CriarPost, @UploadedFiles() arquivos: Array<Express.Multer.File> | undefined) {
    const imagem = arquivos.find(arq => arq.fieldname === 'imagem');
    const arqprocesso = arquivos.filter(arq => arq.fieldname === 'processo');
    criarPost.tags = JSON.parse(criarPost.tagsjson);
    criarPost.ferramentas = JSON.parse(criarPost.ferramentasjson);
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.postsService.criar(token, criarPost, imagem, arqprocesso)
    }
    return { message: 'Token não encontrado' };
  }

  @ApiTags('Post')
  @Patch('atualizar/:id')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  Atualizar(@Req() req: Request, @Body() criarPost: CriarPost, @UploadedFiles() arquivos: Array<Express.Multer.File> | undefined, @Param('id') id: string) {
    const imagem = arquivos.find(arq => arq.fieldname === 'imagem');
    const arqprocesso = arquivos.filter(arq => arq.fieldname === 'processo');
    criarPost.tags = JSON.parse(criarPost.tagsjson);
    criarPost.ferramentas = JSON.parse(criarPost.ferramentasjson);
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      criarPost.id = Number(id);
      return this.postsService.atualizar(token, criarPost, imagem, arqprocesso)
    }
    return { message: 'Token não encontrado' };
  }

  @ApiTags('Post')
  @Get('listar')
  listar() {
    return this.postsService.listar();
  }

  @ApiTags('Post')
  @Get('meus')
  @UseGuards(JwtAuthGuard)
  meus(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.postsService.meus(token);
    }
    return { message: 'Token não encontrado' };
  }

  @ApiTags('Post')
  @Get('post/:id')
  @UseGuards(JwtAuthGuard)
  post(@Req() req: Request, @Param('id') id: string) {
    try {
      const authHeader = req.headers['authorization'];
      if (authHeader) return this.postsService.post(Number(id));
      return { message: 'Token não encontrado' };
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return {
          message: 'Token inválido ou expirado.',
        };
      }
      return {
        message: 'Algo deu errado.',
      };
    }
  }

  @ApiTags('Post')
  @Get('verpost/:id')
  verPost(@Param('id') id: string) {
    try {
      return this.postsService.verpost(Number(id));
    }
    catch (error) {
      return {
        message: 'Algo deu errado.',
      };
    }
  }


  @ApiTags('Post')
  @Get('usuario/:id')
  listarPostUsuario(@Req() req: Request, @Param('id') id: string) {
    try {
      const authHeader = req.headers['authorization']; // Use brackets para acessar propriedades desconhecidas
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        const ehMeuPerfil = this.postsService.ehMeuPerfil(token, +id);
        if (ehMeuPerfil) return this.postsService.meus(token);
      }
      return this.postsService.listarPostUsuario(Number(id));
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return {
          message: 'Token inválido ou expirado.',
        };
      }
      return {
        message: 'Algo deu errado.',
      };
    }


  }
  @ApiTags('Post')
  @Delete('excluir/:id')
  @UseGuards(JwtAuthGuard)
  async excluirPost(@Req() r: Request, @Param('id') id: string) {
    const authHeader = r.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.postsService.excluir(token, Number(id))
    }
    return { 'mensagem': 'Não foi possivel localizar o token' }
  }

  @ApiTags('Post')
  @Post('curtir/:id')
  @UseGuards(JwtAuthGuard)
  curtirOuDescurtir(@Req() req: Request, @Param('id') id: string) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.postsService.curtirOuDescurtir(token, +id);
    }
    return { message: 'Usuario não encontrado' };
  }

}
