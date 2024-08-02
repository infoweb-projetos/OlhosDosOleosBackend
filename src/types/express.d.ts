// O arquivo express.d.ts estende o namespace Express para adicionar a propriedade user ao tipo Request.
import { Usuario } from './middleware'; // Ajuste o caminho conforme a localização do seu tipo Usuario

declare global {
    namespace Express {
        interface Request {
            user?: Usuario;
        }
    }
}
