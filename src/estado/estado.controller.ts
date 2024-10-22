import { Controller, Get } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('estados')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @ApiTags('Estados')
  @Get('listar')
  Listar() {
    return this.estadoService.listar();
  }
}
