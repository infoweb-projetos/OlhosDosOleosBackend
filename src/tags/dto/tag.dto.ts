import { ApiProperty } from "@nestjs/swagger";
export class TagDto {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    ferramenta: boolean;
}
