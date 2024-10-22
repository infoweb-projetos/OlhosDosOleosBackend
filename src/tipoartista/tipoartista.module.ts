import { Module } from '@nestjs/common';
import { TipoartistaService } from './tipoartista.service';
import { TipoartistaController } from './tipoartista.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [TipoartistaController],
  imports: [PersistenciaModule],
  providers: [TipoartistaService],
})
export class TipoartistaModule {}
