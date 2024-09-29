import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { JwtService } from '@nestjs/jwt';
import { CriarPost } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }

  async criar(token: string, post: CriarPost, imagem: Express.Multer.File, processo: Array<Express.Multer.File>) {
    try {
      const tokenDescodificado = this.jwt.verify(token);
      const usuario = await this.persistencia.usuario.findUnique({
        where: { id: tokenDescodificado.usuario },
      });

      

    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      throw new BadRequestException('Erro ao processar a solicitação.');
    }

  }

}
