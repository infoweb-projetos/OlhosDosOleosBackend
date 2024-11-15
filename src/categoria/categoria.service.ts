import { Injectable } from '@nestjs/common';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class CategoriaService {
    constructor(private persistencia: PersistenciaService) {}

    async listar() {
        return {
            estado: 'ok',
            dados: await this.persistencia.categoria.findMany({
                orderBy: {
                    nome: "asc",
                }
            }),
        };
    }

}
