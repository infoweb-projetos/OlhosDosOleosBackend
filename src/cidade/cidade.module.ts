import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [CidadeController],
  imports: [PersistenciaModule],
  providers: [CidadeService],
})
export class CidadeModule {}
