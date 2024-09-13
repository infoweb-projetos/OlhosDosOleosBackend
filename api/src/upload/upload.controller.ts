import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('enviar')
  @UseInterceptors(FileInterceptor('arquivo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        arquivo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Exemplo de upload de 1 arquivo qualquer' })
  @ApiResponse({ status: 201, description: 'Arquivo enviado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro no envio do arquivo.' })
  uploadArquivoSimples(@UploadedFile() arq: Express.Multer.File) {
    console.log(arq);

    return this.uploadService.responderInformacaoArquivo(arq);
  }
}
