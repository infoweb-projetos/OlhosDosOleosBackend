import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('criar')
  @UseInterceptors(FileInterceptor('imagem'))
  @ApiConsumes('multipart/form-data')
  create(@Body() createUsuarioDto: CreateUsuarioDto, @UploadedFile() arq: Express.Multer.File) {
    return this.usuariosService.create(createUsuarioDto, arq);
  }

  @Get('listar')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req : Request) {
    const authHeader = req.headers['authorization']; // Use brackets para acessar propriedades desconhecidas
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Divide "Bearer <token>"
      return this.usuariosService.acharUsuarioToken(token)
    }
    return { message: 'Token não encontrado' };
  }

  @Get('outroperfil/:id')
  acharUsuario(@Param('id') id: string) {
    return this.usuariosService.acharUsuarioId(+id);
  }

  @Patch('atualizar/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete('apagar/:id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
