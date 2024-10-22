import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [EstadoController],
  imports: [PersistenciaModule],
  providers: [EstadoService],
})
export class EstadoModule {}
