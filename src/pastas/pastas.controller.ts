import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PastasService } from './pastas.service';
import { CriarPasta } from './dto/criarPasta.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('pastas')
export class PastasController {
  constructor(private readonly pastasService: PastasService) {}

  @ApiTags('Pastas')
  @Post('criar')
  @UseGuards(JwtAuthGuard)
  criar(@Req() req: Request, @Body() pasta: CriarPasta) {
    const authHeader = req.headers['authorization']; 
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
      return this.pastasService.criar(pasta, token);
    }
    return { message: 'Token não encontrado' };
  }

  @ApiTags('Pastas')
  @Post('favoritar/:id/:idpost')
  @UseGuards(JwtAuthGuard)
  favoritar(@Param('id') pastaId: string, @Param('idpost') postid: string, @Req() req: Request) {
    const authHeader = req.headers['authorization']; 
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
      return this.pastasService.favoritar(+pastaId, +postid, token);
    }
    return { message: 'Token não encontrado' };
  }

  @ApiTags('Pastas')
  @Get('minhas')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const authHeader = req.headers['authorization']; 
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
      return this.pastasService.findAll(token);
    }
    return { message: 'Token não encontrado' };
  }

  @ApiTags('Pastas')
  @Get('favoritado/post/:id')
  taFavoritado(@Param('id') postid: string, @Req() req: Request) {
    try {
      const authHeader = req.headers['authorization']; 
      const token = authHeader.split(' ')[1]; 
      return this.pastasService.taFavoritado(+postid, token);
    } catch (error) {
      return { message: error.message, favoritado: false };
    }
 
  }

  @ApiTags('Pastas')
  @Get(':id/posts')
  @UseGuards(JwtAuthGuard)
  async getPostsByPasta(@Param('id') pastaId: string, @Req() req: Request) {
    const authHeader = req.headers['authorization']; 
    if (authHeader) {
      return this.pastasService.getPostsByPasta(pastaId);
    }
    return { message: 'Token não encontrado' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pastasService.findOne(+id);
  }

  @ApiTags('Pastas')
  @Delete('excluir/:id')
  @UseGuards(JwtAuthGuard)
  async excluirPasta(@Req() r: Request, @Param('id') id: string) {
    const authHeader = r.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.pastasService.excluir(token, Number(id))
    }
    return { 'mensagem': 'Não foi possivel localizar o token' }
  }

  @ApiTags('Pastas')
  @Delete('excluir/:idpasta/:idpost')
  @UseGuards(JwtAuthGuard)
  async excluirPost(@Req() r: Request, @Param('idpasta') idpasta: string, @Param('idpost') idpost: string) {
    const authHeader = r.headers['authorization'];
    if (authHeader) {
      return this.pastasService.excluirPost(+idpasta, +idpost)
    }
    return { 'mensagem': 'Não foi possivel localizar o token' }
  }

}
