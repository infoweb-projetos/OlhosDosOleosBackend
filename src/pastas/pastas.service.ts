import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CriarPasta } from './dto/criarPasta.dto';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { JwtService } from '@nestjs/jwt';
import { Post } from '@prisma/client';

@Injectable()
export class PastasService {
  constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }
  
  async criar(pasta: CriarPasta, token: string) {
    try {
      const tokenDescodificado = this.jwt.verify(token);
      if (!pasta.nome) {
        throw new BadRequestException('Nome da pasta inválido');
      }
      const resultado = await this.persistencia.pasta.create({
        data:{
          nome : pasta.nome,
          usuarioid: tokenDescodificado.usuario, 
        }
      });
      
      return {
        estado: 'ok',
        dados: resultado,
      }
    } catch (error) {
      return {message: error}
    }
  }

  async favoritar(pastaid: number, postid: number, token: string) {
    try {
      const tokenDescodificado = this.jwt.verify(token);
      if (!tokenDescodificado.usuario)  throw new BadRequestException('Usuario inválido');
      if (!pastaid) {
        throw new BadRequestException('Nome da pasta inválido');
      }
      if (!postid) {
        throw new BadRequestException('Post inválido');
      }

      const existe = await this.persistencia.postPasta.findUnique({
        where:{
          postid_pastaid:{
            postid: postid,
            pastaid: pastaid,
          }
        }
      });

      if (existe) return {
        estado: 'ok',
        dados: existe,
      }

      const resultado = await this.persistencia.postPasta.create({
        data:{
          postid : postid,
          pastaid: pastaid, 
        }
      });
      return {
        estado: 'ok',
        dados: resultado,
      }
    } catch (error) {
      return {message: error}
    }
  }

  async getPostsByPasta(pastaId: string) {
    try { 
      // Convertendo pastaId para número
      const pastaIdNumber = Number(pastaId);
      if (isNaN(pastaIdNumber)) {
        throw new BadRequestException('ID da pasta inválido');
      }
      console.log('aqui');
      // Buscando a pasta com os posts associados (via PostPasta)
      const pasta = await this.persistencia.postPasta.findMany({
        where: { pastaid: pastaIdNumber },
        include: {
          post: { 
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
      }).then(response => {
        return response; 
      }).catch(error =>{
        console.log(error);
      });

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

  remove(id: number) {
    return `This action removes a #${id} pasta`;
  }
}
