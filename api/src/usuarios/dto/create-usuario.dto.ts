import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    senha: string;
    @ApiProperty()
    usuario: string;
}
