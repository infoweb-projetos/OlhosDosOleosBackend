import { Module } from '@nestjs/common';
import { PersistenciaService } from './persistencia.service';

@Module({
  providers: [PersistenciaService],
  exports: [PersistenciaService],
})
export class PersistenciaModule {}
