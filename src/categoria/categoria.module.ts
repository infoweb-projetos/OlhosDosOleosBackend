import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [CategoriaController],
  imports: [PersistenciaModule],
  providers: [CategoriaService],
})
export class CategoriaModule {}
