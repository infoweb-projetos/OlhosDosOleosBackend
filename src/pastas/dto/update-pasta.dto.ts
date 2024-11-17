import { PartialType } from '@nestjs/swagger';
import { CreatePastaDto } from './create-pasta.dto';

export class UpdatePastaDto extends PartialType(CreatePastaDto) {}
