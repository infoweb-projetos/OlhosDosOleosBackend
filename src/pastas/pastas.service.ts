import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePastaDto } from './dto/create-pasta.dto';
import { UpdatePastaDto } from './dto/update-pasta.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PastasService {
  constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }
  
  create(createPastaDto: CreatePastaDto) {
    return 'This action adds a new pasta';
  }

  async findAll(token: string) {
    try {
      const tokenDescodificado = this.jwt.verify(token);
      return {
        estado: 'ok',
        dados: await this.persistencia.pasta.findMany({
          where: {
            usuarioid: tokenDescodificado.usuario,
          },
          include: {
            posts: {
              select: {
                post: {
                  select: {
                    imagem: true,
                    imagemtipo: true,
                  }
                }
              }
            },
          }
        }),
      };
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      throw new BadRequestException('Erro ao processar a solicitação.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pasta`;
  }

  update(id: number, updatePastaDto: UpdatePastaDto) {
    return `This action updates a #${id} pasta`;
  }

  remove(id: number) {
    return `This action removes a #${id} pasta`;
  }
}
