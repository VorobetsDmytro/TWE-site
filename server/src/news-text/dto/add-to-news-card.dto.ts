import { IsNotEmpty, IsString, Length } from "class-validator";

export class AddToNewsCardDto {
    id?: string;
 
    @IsString({message: 'The global region name must be a string'})
    @Length(1, 10, {message: 'The global region name can contain: 1 min and 10 max characters.'})
    globalRegionName: string;

    @IsString({message: 'The title must be a string'})
    @Length(3, 50, {message: 'The title can contain: 3 min and 50 max characters.'})
    title: string;

    @IsString({message: 'The body must be a string'})
    @Length(3, 200, {message: 'The body can contain: 3 min and 200 max characters.'})
    body: string;

    @IsString({message: 'The news card id must be a string'})
    @IsNotEmpty({message: 'The news card id can not be empty'})
    newsCardId: string;
}