import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty()
    nome: string;
}
