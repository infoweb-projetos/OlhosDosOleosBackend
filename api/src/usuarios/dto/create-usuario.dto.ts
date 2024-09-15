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

    @ApiProperty({ required: false, type: Number})
    estadoid?: number;

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

    @ApiProperty({ required: false })
    imagemtipo?: string;

    @ApiProperty({ required: false })
    cor1?: string;

    @ApiProperty({ required: false })
    cor2?: string;

    @ApiProperty({ required: false })
    cor3?: string;

    @ApiProperty({ required: false })
    cor4?: string;
}