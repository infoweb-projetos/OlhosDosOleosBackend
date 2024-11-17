import { Module } from '@nestjs/common';
import { PastasService } from './pastas.service';
import { PastasController } from './pastas.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';

@Module({
  controllers: [PastasController],
  imports: [PersistenciaModule, AutenticacaoModule],
  providers: [PastasService],
})
export class PastasModule {}
