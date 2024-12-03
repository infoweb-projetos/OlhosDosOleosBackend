import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePastaDto } from './dto/create-pasta.dto';
import { UpdatePastaDto } from './dto/update-pasta.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { JwtService } from '@nestjs/jwt';
import { Post } from '@prisma/client';

@Injectable()
export class PastasService {
  constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }
  
  create(createPastaDto: CreatePastaDto) {
    return 'This action adds a new pasta';
  }

  async getPostsByPasta(pastaId: string) {
    try { 
      // Convertendo pastaId para número
      const pastaIdNumber = Number(pastaId);
      if (isNaN(pastaIdNumber)) {
        throw new BadRequestException('ID da pasta inválido');
      }
  
      // Buscando a pasta com os posts associados (via PostPasta)
      const pasta = await this.persistencia.postPasta.findMany({
        where: { pastaid: pastaIdNumber },
        include: {
          post: { 
           select:{
            imagem: true,
            titulo: true,
            id: true,
            sensivel: true,
            usuarioid: true,
            imagemtipo: true,
           },
           include:{
            usuario:{
              select:{
                nome: true,
                imagem: true,
                imagemtipo: true,
              }
            }
           }
          },
        },
      });
  
      // Verificando se a pasta foi encontrada
      if (!pasta) {
        throw new BadRequestException('Pasta não encontrada.');
      }

      return pasta; 
    } catch (error) {
      // Tratamento de erro relacionado ao token ou falha na requisição
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      throw new BadRequestException('Erro ao processar a solicitação.');
    }
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
