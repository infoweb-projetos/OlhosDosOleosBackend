import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @ApiTags('Categorias')
  @Get('listar')
  Listar() {
    return this.categoriaService.listar();
  }
}
