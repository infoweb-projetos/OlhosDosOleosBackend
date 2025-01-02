import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';

@Module({
  controllers: [ComentariosController],
  imports: [PersistenciaModule, AutenticacaoModule],
  providers: [ComentariosService],
})
export class ComentariosModule {}
