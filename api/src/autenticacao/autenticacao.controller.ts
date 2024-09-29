import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
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
  @Get('teste')
  @UseGuards(JwtAuthGuard)
  teste() {
    return {
      status: 'ok',
    }
  }
}