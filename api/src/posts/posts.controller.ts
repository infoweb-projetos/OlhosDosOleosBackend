import { Body, Controller, Get, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { CriarPost } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiTags('Post')
  @Get('criar')
  @UseInterceptors(FileInterceptor('imagem'))
  @UseInterceptors(FilesInterceptor('processo'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req: Request, @Body() criarPost: CriarPost, @UploadedFile() imagem: Express.Multer.File, @UploadedFiles() processo: Array<Express.Multer.File>) {
    const authHeader = req.headers['authorization']; 
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
      return this.postsService.criar(token, criarPost, imagem, processo)
    }
    return { message: 'Token não encontrado' };
  }

}
