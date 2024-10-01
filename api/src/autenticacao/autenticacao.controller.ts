import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { AutenticacaoService } from './autenticacao.service';
import { LoginDto } from './dto/login.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) { }

  @ApiTags('Autenticação')
  @Post('login')
  autenticar(@Body() login: LoginDto) {
    return this.autenticacaoService.login(login.email, login.senha)
  }
  @ApiTags('Autenticação')
  @Get('verificatoken')
  @UseGuards(JwtAuthGuard)
  teste(@Req() req) {
    const authHeader = req.headers['authorization']; 
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
      return this.autenticacaoService.verificaToken(token)
    }
    return { message: 'Token não encontrado' };
  }
}