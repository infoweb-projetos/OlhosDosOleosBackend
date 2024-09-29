import { Module } from '@nestjs/common';
import { PersistenciaModule } from 'src/persistencia/persistencia.module';
import { AutenticacaoModule } from 'src/autenticacao/autenticacao.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  imports: [PersistenciaModule, AutenticacaoModule],
  providers: [PostsService],
})
export class PostsModule {}
