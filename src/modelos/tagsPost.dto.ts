import { ApiProperty } from "@nestjs/swagger";
export class TagPostDto {
    @ApiProperty()
    tagid: string;
    @ApiProperty()
    postid: string;
}
