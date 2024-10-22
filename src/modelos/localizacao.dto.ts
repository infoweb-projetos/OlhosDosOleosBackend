import { ApiProperty } from "@nestjs/swagger";
import { CidadeDto } from "src/cidade/dto/cidade.dto";
import { EstadoDto } from "src/estado/dto/estado.dto";
import { CreateUsuarioDto } from "src/usuarios/dto/create-usuario.dto";

export class LocalizacaoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    usuarioid: number;
    @ApiProperty()
    cidadeid: number;
    @ApiProperty()
    estadoid: number;

    estado?: EstadoDto;
    cidade?: CidadeDto;
    usuario?: CreateUsuarioDto;
}