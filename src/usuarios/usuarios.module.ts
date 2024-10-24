import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsuariosController],
  imports: [PersistenciaModule, AutenticacaoModule],
  providers: [UsuariosService],
})
export class UsuariosModule {}
