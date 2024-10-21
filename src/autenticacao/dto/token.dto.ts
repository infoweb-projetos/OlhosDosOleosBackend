import { ApiProperty } from "@nestjs/swagger";
export class TokenDto{
    @ApiProperty()
    acessToken: string;
}