import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';

@Module({
  controllers: [TagsController],
  imports: [PersistenciaModule],
  providers: [TagsService],
})
export class TagsModule {}
