import { IsString, Length } from "class-validator";

export class CreateGlobalRegionDto {
    id?: string;

    @IsString({message: 'The name must be a string'})
    @Length(1, 10, {message: 'The region name can contain: 1 min and 10 max characters.'})
    name: string;
}