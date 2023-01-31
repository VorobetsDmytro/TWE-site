import { IsEmail, IsString } from "class-validator";

export class ForgotPasswordDto {
    @IsString({message: 'The email variable must be a string.'})
    @IsEmail({}, {message: `The email variable must be an email.`})
    email: string;
}