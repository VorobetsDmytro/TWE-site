import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class RateNewsBlockDto {
    @IsString({message: 'The news block rate id must be a string'})
    @IsNotEmpty({message: 'the news block rate id can not be empty'})
    newsBlockRateId?: string;

    @IsBoolean({message: 'The isLike must be a boolean'})
    isLike: boolean;
}