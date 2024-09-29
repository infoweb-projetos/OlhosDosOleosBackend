import { ApiProperty } from "@nestjs/swagger";

export class CriarPost {
    @ApiProperty()
    id?: number;

    @ApiProperty({ type: 'string', format: 'binary' })
    imagem?: Buffer;

    @ApiProperty()
    imagemtipo?: string;

    @ApiProperty()
    titulo?: string;

    @ApiProperty()
    descricao?: string;

    @ApiProperty()
    sensivel?: boolean;

    @ApiProperty()
    rascunho?: boolean;

    @ApiProperty()
    excluido?: boolean;

    @ApiProperty()
    entrada?: Date;

    @ApiProperty()
    categoriaid: number;

    @ApiProperty()
    usuarioid: number;

    @ApiProperty()
    tags: string[];
}