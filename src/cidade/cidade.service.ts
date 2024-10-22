import { Injectable } from '@nestjs/common';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class CidadeService {
    constructor(private persistencia: PersistenciaService) { }
    async listar() {
        return {
            estado: 'ok',
            dados: await this.persistencia.cidade.findMany({
                orderBy: {
                    nome: "asc",
                }
            }),
        };
    }
}
