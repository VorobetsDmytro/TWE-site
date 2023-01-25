import { RegistrationDto } from "../dto/registration.dto";

class RegistrationMapper {
    fromControllerToService(dto: RegistrationDto): RegistrationDto {
        return {
            id: dto.id,
            email: dto.email,
            password: dto.password,
            username: dto.username
        };
    }
}

export const registrationMapper = new RegistrationMapper();