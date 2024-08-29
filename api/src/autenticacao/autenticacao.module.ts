import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';

const jwtSecret = 'alunos@infoweb@cnat';

@Module({
  controllers: [AutenticacaoController],
  imports: [PersistenciaModule, PassportModule, JwtModule.register({
    secret: jwtSecret,
    signOptions: {expiresIn: '5m'},
  })],
  providers: [AutenticacaoService],
})
export class AutenticacaoModule {}
