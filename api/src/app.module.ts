import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PersistenciaModule } from './persistencia/persistencia.module';
import { UploadModule } from './upload/upload.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsuariosModule, AutenticacaoModule, PersistenciaModule, UploadModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
