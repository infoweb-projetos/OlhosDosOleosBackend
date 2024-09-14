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

    @ApiProperty({ required: false, type: Number})
    cidadeid?: number;

    @ApiProperty({ required: false })
    insta?: string;

    @ApiProperty({ required: false })
    youtube?: string;

    @ApiProperty({ required: false })
    zap?: string;

    @ApiProperty({ required: false })
    face?: string;

    @ApiProperty({ required: false })
    tipoid?: string;

    @ApiProperty({ required: false })
    biografia?: string;

    @ApiProperty({ required: false, type: 'string', format: 'binary' })
    imagem?: Buffer;
}