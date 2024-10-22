import { Controller, Get } from '@nestjs/common';
import { TipoartistaService } from './tipoartista.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('tiposartista')
export class TipoartistaController {
  constructor(private readonly tipoartistaService: TipoartistaService) {}

  @ApiTags('Tipo Artista')
  @Get('listar')
  Listar() {
    return this.tipoartistaService.listar();
  }

}
