import { Module } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { AtividadesController } from './atividades.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';

@Module({
  controllers: [AtividadesController],
  imports: [PersistenciaModule, AutenticacaoModule],
  providers: [AtividadesService],
})
export class AtividadesModule {}
