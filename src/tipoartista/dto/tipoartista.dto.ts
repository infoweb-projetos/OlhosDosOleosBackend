import { ApiProperty } from "@nestjs/swagger";

export class TipoArtistaDto {
    @ApiProperty()
    nome: string;
}
