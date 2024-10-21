import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  responderInformacaoArquivo(arquivo: Express.Multer.File) {
    return {
      estado: 'ok',
      dados: {
        nome: arquivo.originalname,
        tamanho: arquivo.size,
        mimetype: arquivo.mimetype,
        encode: arquivo.encoding,
        bytesimg: arquivo.buffer
      },
    };
  }
}

