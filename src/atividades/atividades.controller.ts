import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { Atividade } from '@prisma/client';

@Controller('atividades')
export class AtividadesController {
  constructor(private readonly atividadesService: AtividadesService) {}

  @ApiTags('Atividades')
  @Get('listar')
  @UseGuards(JwtAuthGuard)
  meus(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.atividadesService.listar(token);
    }
    return { message: 'Token não encontrado' };
  }
  @ApiTags('Atividades')
  @Post('criar')
  @UseGuards(JwtAuthGuard)
  criar(@Req() req: Request, @Body() atividade: Atividade) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.atividadesService.criar(token, atividade);
    }
    return { message: 'Token não encontrado' };
  }
}
