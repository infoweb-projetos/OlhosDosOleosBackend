import { Injectable } from '@nestjs/common';
import { PersistenciaService } from 'src/persistencia/persistencia.service';

@Injectable()
export class TipoartistaService {
    constructor(private persistencia: PersistenciaService) { }
    async listar() {
        return {
            estado: 'ok',
            dados: await this.persistencia.tipoArtista.findMany({
                orderBy: {
                    nome: "asc",
                }
            }),
        };
    }
}
