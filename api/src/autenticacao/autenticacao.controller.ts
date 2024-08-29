import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { LoginDto } from './dto/login.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  autenticar(@Body() login: LoginDto){
    return this.autenticacaoService.login(login.email, login.senha)
  }
}