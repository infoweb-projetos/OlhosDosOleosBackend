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

  // async getPostsByPasta(pastaId: string, token: string): Promise<Post[]> {
  //   try {
  //     // Validação do token
  //     const tokenDescodificado = this.jwt.verify(token);
  
  //     // Convertendo pastaId para número
  //     const pastaIdNumber = Number(pastaId);
  //     if (isNaN(pastaIdNumber)) {
  //       throw new BadRequestException('ID da pasta inválido');
  //     }
  
  //     // Buscando a pasta com os posts associados (via PostPasta)
  //     const pasta = await this.persistencia.pasta.findUnique({
  //       where: { id: pastaIdNumber },
  //       include: {
  //         posts: { // Relacionamento com PostPasta (tabela intermediária)
  //           include: {
  //             post: { // Relacionamento com Post
  //               include: {
  //                 usuario: { // Inclui o usuário do post
  //                   select: {
  //                     nome: true, // Nome do usuário
  //                     imagem: true, // Imagem binária do usuário
  //                   },
  //                 },
  //                 imagem: true, // Imagem binária do post (Bytes)
  //                 imagemtipo: true, // Tipo da imagem do post
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  
  //     // Verificando se a pasta foi encontrada
  //     if (!pasta) {
  //       throw new BadRequestException('Pasta não encontrada.');
  //     }
  
  //     // Retorna os posts da pasta
  //     // Acessa os posts relacionados através da tabela PostPasta
  //     return pasta.posts.map((postPasta) => postPasta.post); // Acessa os posts relacionados
  //   } catch (error) {
  //     // Tratamento de erro relacionado ao token ou falha na requisição
  //     if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
  //       throw new UnauthorizedException('Token inválido ou expirado.');
  //     }
  //     throw new BadRequestException('Erro ao processar a solicitação.');
  //   }
  // }
  
  
  

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
