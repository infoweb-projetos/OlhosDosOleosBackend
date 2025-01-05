import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { CriarComentarioDto } from './dto/criarComentario';

@Injectable()
export class ComentariosService {
    constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }

    async listar(id: number) {
        return {
            estado: 'ok',
            dados: await this.persistencia.comentario.findMany({
                where:{
                    postid: id,
                },
                include:{
                    usuario: true,
                },
                orderBy:{
                    criacao: "desc"
                },
            }),
        };
    }
    async apagar(id: number) {
        const atividades = await this.persistencia.atividade.deleteMany({
            where:{
               comentarioid: id,
            },
        }).catch(error => console.log(error));

        return {
            estado: 'ok',
            dados: await this.persistencia.comentario.delete({
                where:{
                    id: id,
                },
            }),
            atividades: atividades,
        };
    }

    async criar(token : string, comentario: CriarComentarioDto) {
        const tokenDescodificado = this.jwt.verify(token);

        const comentarioFeito = await this.persistencia.comentario.create({
            data:{
               usuario: { connect: { id: tokenDescodificado.usuario  } },
               post: { connect: { id: comentario.postid  } },
               texto: comentario.texto ?? null,
            },
        })

        await this.persistencia.atividade.create({
            data:{
               usuarioid: tokenDescodificado.usuario,
               postid: comentario.postid,
               comentarioid: comentarioFeito.id,
            },
        }).catch(error => console.log(error));

        return {
            estado: 'ok',
            dados: comentarioFeito,
        };
    }
}
