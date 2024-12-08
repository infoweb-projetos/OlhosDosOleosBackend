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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pastasService.remove(+id);
  }
}
