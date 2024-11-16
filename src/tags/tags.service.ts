import { Injectable } from '@nestjs/common';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class TagsService {
    constructor(private persistencia: PersistenciaService) { }

    async listar(ehFerramenta: boolean) {
        return {
            estado: 'ok',
            dados: await this.persistencia.tag.findMany({
                where:{ferramenta: ehFerramenta},
                orderBy: {
                    nome: "asc",
                }
            }),
        };
    }
}
