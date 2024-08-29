import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PersistenciaModule } from './persistencia/persistencia.module';

@Module({
  imports: [UsuariosModule, AutenticacaoModule, PersistenciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
