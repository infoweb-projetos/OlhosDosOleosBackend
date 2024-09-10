import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

export const jwtSecret = 'alunos@infoweb@cnat';

@Module({
  controllers: [AutenticacaoController],
  imports: [PersistenciaModule, PassportModule, JwtModule.register({
    secret: jwtSecret,
    signOptions: {expiresIn: '5m'},
  })],
  providers: [AutenticacaoService, JwtStrategy],
  exports: [JwtModule],
})
export class AutenticacaoModule {}
