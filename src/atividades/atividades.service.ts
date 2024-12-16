import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersistenciaService } from 'src/persistencia/persistencia.service';
import { AtividadeDto } from './dto/criarAtividade.dto';

@Injectable()
export class AtividadesService {
    constructor(private persistencia: PersistenciaService, private jwt: JwtService) { }

    async listar(token : string) {
        const tokenDescodificado = this.jwt.verify(token);
        return {
            estado: 'ok',
            dados: await this.persistencia.atividade.findMany({
                where: {
                    usuarioid: tokenDescodificado.usuario,
                },
                include:{
                    post:{
                        include:{
                            usuario: true
                        },
                    },
                    usuario: true,
                    comentario: true,
                },
                orderBy: {
                    criacao: "desc",
                },
            }),
        };
    }

    async criar(token : string, atividade: AtividadeDto) {
        const tokenDescodificado = this.jwt.verify(token);
        return {
            estado: 'ok',
            dados: await this.persistencia.atividade.create({
                data:{
                   usuarioid: tokenDescodificado.usuarioid,
                   postid: atividade.postid,
                   comentarioid: atividade.comentarioid ?? null,
                },
            }),
        };
    }
}
