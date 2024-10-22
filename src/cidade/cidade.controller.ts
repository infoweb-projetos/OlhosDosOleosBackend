import { Controller, Get } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('cidades')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @ApiTags('Estados')
  @Get('listar')
  Listar() {
    return this.cidadeService.listar();
  }
}
