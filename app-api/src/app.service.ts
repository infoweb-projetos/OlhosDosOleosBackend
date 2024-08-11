import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      estado: 'ok',
      mensagem: 'API Online',
      dados: 'API exemplo da disciplina de POS',
    }; //TESTAR: curl --verbose localhost:3000
  }
}
