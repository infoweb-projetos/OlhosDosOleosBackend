import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiTags('Tags')
  @Get('tags')
  Tags() {
    return this.tagsService.listar(false);
  }

  @ApiTags('Tags')
  @Get('ferramentas')
  Ferramentas() {
    return this.tagsService.listar(true);
  }
  
}
