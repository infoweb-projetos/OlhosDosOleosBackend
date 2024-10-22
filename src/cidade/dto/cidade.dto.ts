import { ApiProperty } from "@nestjs/swagger";
import { EstadoDto } from "src/estado/dto/estado.dto";

export class CidadeDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nome: string;

    estado?: EstadoDto;
}
