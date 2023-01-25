import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdateNewsCardTextDto {
    @IsOptional({message: 'Incorrect globalRegionName.'})
    @IsString({message: 'The global region name must be a string'})
    @Length(1, 10, {message: 'The global region name can contain: 1 min and 10 max characters.'})
    globalRegionName?: string;

    @IsOptional({message: 'Incorrect title.'})
    @IsString({message: 'The title must be a string'})
    @Length(3, 50, {message: 'The title can contain: 3 min and 50 max characters.'})
    title?: string;

    @IsOptional({message: 'Incorrect body.'})
    @IsString({message: 'The body must be a string'})
    @Length(3, 200, {message: 'The body can contain: 3 min and 200 max characters.'})
    body?: string;
}