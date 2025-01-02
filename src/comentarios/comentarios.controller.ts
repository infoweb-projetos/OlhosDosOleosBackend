import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { CriarComentarioDto } from './dto/criarComentario';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @ApiTags('Atividades')
  @Get('post/:id/comentarios')
  meus(@Param('id') id: string) {
    try {
      return this.comentariosService.listar(+id);
    }
    catch{
      return { message: 'Token não encontrado' };
    }
  
  }

  @ApiTags('Comentarios')
  @Post('criar')
  @UseGuards(JwtAuthGuard)
  criar(@Req() req: Request, @Body() comentario: CriarComentarioDto) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.comentariosService.criar(token, comentario);
    }
    return { message: 'Token não encontrado' };
  }
}
