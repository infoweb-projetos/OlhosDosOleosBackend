import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { JwtService } from '@nestjs/jwt';
import { CriarPost } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }
  
  public stringParaBooleano(valor: any): boolean {
    return valor.toLowerCase() === 'true';
  }
  
  async listar() {
    return {
      estado: 'ok',
      dados: await this.persistencia.post.findMany({
        where:{
          rascunho: false,
        },
        include:{
          usuario: true,
        },
        orderBy:{
          entrada: "desc",
        },
      }),
    };
  }

  async post(id: number) {
    return {
      estado: 'ok',
      dados: await this.persistencia.post.findUnique({
        where:{
          id: id,
        },
        include:{
          tags: {
            select: {
              tag: {
                select: {
                  nome: true,
                  ferramenta: true,
                }
              }
            }
          },
          processo: true,
        }
      }),
    };
  }

  async listarPostUsuario(id : number) {
    return {
      estado: 'ok',
      dados: await this.persistencia.post.findMany({
        where: {
          usuarioid: id,
          rascunho: false,
        },
        include:{
          usuario: true,
        },
        orderBy:{
          entrada: "desc",
        },
      }),
    };
  }
  
  public ehMeuPerfil(token : string, id : number) : boolean{
    try{
      if(!token) return false;
      const tokenDescodificado = this.jwt.verify(token);
      if (tokenDescodificado.usuario == id) return true;
      return false;
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      throw new BadRequestException('Algo deu errado.');
    }
  }

  async meus(token:string) {
    try {
      const tokenDescodificado = this.jwt.verify(token);
      return {
        estado: 'ok',
        dados: await this.persistencia.post.findMany({
          where: {
            usuarioid: tokenDescodificado.usuario,
          },
          orderBy:{
            entrada: "desc",
          },
          include:{
            usuario: true,
          },
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

  async criar(token: string, post: CriarPost, imagem: Express.Multer.File, processo: Array<Express.Multer.File> | undefined) {
    try {
      const tokenDescodificado = this.jwt.verify(token);
      const usuario = await this.persistencia.usuario.findUnique({
        where: { id: tokenDescodificado.usuario },
      });

      if(usuario.id != post.usuarioid){
        throw new BadRequestException('Usuario invalido');
      }

      if (!imagem) {
        throw new BadRequestException('Imagem da obra é obrigatória.');
      }

      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(imagem.mimetype)) {
        throw new BadRequestException('Foto da Obra enviado não é uma imagem válida');
      }
  

      if (!post.titulo) {
        throw new BadRequestException('Titulo invalido');
      }

      if (post.categoriaid) {
        const categoria = await this.persistencia.categoria.findUnique({
          where: { nome: post.categoriaid },
        });
        if (!categoria) {
          throw new BadRequestException('Categoria invalida');
        }
      }

      try {
        if (imagem) {
          post.imagem = imagem.buffer;
          post.imagemtipo = imagem.mimetype;
        }
        const postCriado = await this.persistencia.post.create({
          data:{
            titulo: post.titulo,
            categoria: { connect: { nome: post.categoriaid } } ,
            usuario: { connect: { id: Number(post.usuarioid) } },
            imagem: post.imagem,
            imagemtipo: post.imagemtipo,
            rascunho: post.rascunho ? this.stringParaBooleano(post.rascunho) : false,
            sensivel: post.sensivel ? this.stringParaBooleano(post.sensivel) : false,
            descricao: post.descricao ? post.descricao : null,
          },
        });

        for (let tag of post.tags){
          const tagExiste = await this.persistencia.tag.findUnique({
            where: { nome: tag }
          });
          if (!tagExiste){
            await this.persistencia.tag.create({
              data:{
                nome: tag,
              }
            });
          }
          await this.persistencia.postTag.create({
            data:{
              postid: postCriado.id,
              tagid: tag,
            }
          })
        }

        for (let tag of post.ferramentas){
          const tagExiste = await this.persistencia.tag.findUnique({
            where: { nome: tag }
          });
          if (!tagExiste){
            await this.persistencia.tag.create({
              data:{
                nome: tag,
                ferramenta: true,
              }
            });
          }
          await this.persistencia.postTag.create({
            data:{
              postid: postCriado.id,
              tagid: tag,
            }
          })
        }

        let processosSalvos = [];
        for (let img of processo){
          if (['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(img.mimetype)) {
            let processoCriado = await this.persistencia.processo.create({
              data:{
                postid: postCriado.id,
                imagem: img.buffer,
                imagemtipo: img.mimetype,
              }
            });
            processosSalvos.push(processoCriado);
          }
        }
        return {
          estado: 'ok',
          dados: postCriado,
          processo: processosSalvos,
        };
      }
      catch (error) {
        console.error('Erro ao criar Post:', error);
        throw new BadRequestException('Algo deu errado:' + error);
      }

    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }
      throw new BadRequestException('Erro ao processar a solicitação.');
    }

  }
  async excluir(token:string, postId:number){
    try{
      const tokenDecodificado = this.jwt.verify(token);

      const post= await this.persistencia.post.findUnique({
        where:{id:postId},
      });
      if (!post){
        throw new BadRequestException("O post não foi encontrado ou não existe!");
      }
      if (post.usuarioid !== tokenDecodificado.usuario){
        throw new BadRequestException("Você não tem permissão para excluir esse post!");
      }
      await this.persistencia.post.delete({
        where:{id:postId},
      });
      return {'estado':'OK', 'mensagem':'O post foi excluído com sucesso!'}
    }catch(error){
      if(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
        throw new BadRequestException ('Token inválido ou expirado!')  
      }
      throw new BadRequestException('Houve um erro na operação')
    }
    }
}
