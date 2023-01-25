import { IsString, Length, IsEmail } from "class-validator";

export class RegistrationDto {
    id?: string;

    @IsString({message: 'The email must be a string.'})
    @IsEmail({}, {message: `The email variable must be an email.`})
    email: string;

    @IsString({message: 'The username must be a string.'})
    @Length(3, 30, {message: 'The username can contain: 3 min and 30 max characters.'})
    username: string;

    @IsString({message: 'The password must be a string.'})
    @Length(3, 30, {message: 'The password can contain: 3 min and 30 max characters.'})
    password: string;
}