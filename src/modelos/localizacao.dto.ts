import { ApiProperty } from "@nestjs/swagger";
import { CreateUsuarioDto } from "src/usuarios/dto/create-usuario.dto";

export class CidadeDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nome: string;

    estado?: EstadoDto;
}

export class EstadoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nome: string;
}

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