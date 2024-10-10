import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EditaBannerDto } from './dto/edita-banner-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @ApiTags('Usuario')
  @Post('criar')
  @UseInterceptors(FileInterceptor('imagem'))
  @ApiConsumes('multipart/form-data')
  create(@Body() createUsuarioDto: CreateUsuarioDto, @UploadedFile() arq: Express.Multer.File) {
    return this.usuariosService.create(createUsuarioDto, arq);
  }

  @ApiTags('Usuario')
  @Get('ultimos')
  ultimosCemUsurios() {
    return this.usuariosService.ultimosCemUsurios();
  }

  @ApiTags('Usuario')
  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  acharUsuarioToken(@Req() req: Request) {
    const authHeader = req.headers['authorization']; // Use brackets para acessar propriedades desconhecidas
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Divide "Bearer <token>"
      return this.usuariosService.acharUsuarioToken(token)
    }
    return { message: 'Token não encontrado' };
  }

  @ApiTags('Usuario')
  @Get('outroperfil/:id')
  acharUsuario(@Req() req: Request, @Param('id') id: string) {
    const authHeader = req.headers['authorization']; // Use brackets para acessar propriedades desconhecidas
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const ehMeuPerfil = this.usuariosService.ehMeuPerfil(token, +id);
      if (ehMeuPerfil) return this.usuariosService.acharUsuarioToken(token);
    }
    return this.usuariosService.acharUsuarioId(+id);
  }

  @ApiTags('Usuario')
  @Get('soueu/:id')
  verificarUsurioLogado(@Req() req: Request, @Param('id') id: string) {
    const authHeader = req.headers['authorization']; // Use brackets para acessar propriedades desconhecidas
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const ehMeuPerfil = this.usuariosService.ehMeuPerfil(token, +id);
      console.log(ehMeuPerfil);
      return{
        estado: 'ok',
        ehMeuPerfil: ehMeuPerfil,
      }
    }
    return{
      estado: 'ok',
      ehMeuPerfil: false,
    }
   
  }

  @ApiTags('Usuario')
  @Patch('banner')
  @UseInterceptors(FileInterceptor('banner'))
  @ApiConsumes('multipart/form-data')
  editarBanner(@Req() req: Request, @Body() editaBannerDto: EditaBannerDto, @UploadedFile() arq: Express.Multer.File) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.usuariosService.editarBanner(token, editaBannerDto, arq);
    }
    return { message: 'Token não encontrado' };

  }

  @ApiTags('Usuario')
  @Patch('atualizar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imagem', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ]))
  @ApiConsumes('multipart/form-data')
  atualizar(@Req() req: Request, @Body() updateUsuarioDto: UpdateUsuarioDto, @UploadedFiles() files: { imagem?: Express.Multer.File[], banner?: Express.Multer.File[] }) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const imagem = files.imagem ? files.imagem[0] : null;
      const banner = files.banner ? files.banner[0] : null;
      return this.usuariosService.atualizar(token, updateUsuarioDto, imagem, banner);
    }
    return { message: 'Token não encontrado' };
  }

  @ApiTags('Usuario')
  @Delete('apagar/:id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
