import { ApiProperty } from "@nestjs/swagger";

export class EditaBannerDto {
    @ApiProperty({ required: false, type: 'string', format: 'binary' })
    banner?: Buffer;

    @ApiProperty({ required: false })
    bannertipo?: string;
}