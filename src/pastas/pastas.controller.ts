import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PastasService } from './pastas.service';
import { CreatePastaDto } from './dto/create-pasta.dto';
import { UpdatePastaDto } from './dto/update-pasta.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('pastas')
export class PastasController {
  constructor(private readonly pastasService: PastasService) {}

  @Post()
  create(@Body() createPastaDto: CreatePastaDto) {
    return this.pastasService.create(createPastaDto);
  }

  @ApiTags('Pastas')
  @Get('minhas')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const authHeader = req.headers['authorization']; 
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
      return this.pastasService.findAll(token);
    }
    return { message: 'Token não encontrado' };
  }

  // @Get(':id/posts')
  // @UseGuards(JwtAuthGuard)
  // async getPostsByPasta(@Param('id') pastaId: string, @Req() req: Request) {
  //   const authHeader = req.headers['authorization']; 
  //   if (authHeader) {
  //     const token = authHeader.split(' ')[1]; 
  //     return this.pastasService.getPostsByPasta(pastaId, token);
  //   }
  //   return { message: 'Token não encontrado' };
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pastasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePastaDto: UpdatePastaDto) {
    return this.pastasService.update(+id, updatePastaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pastasService.remove(+id);
  }
}
