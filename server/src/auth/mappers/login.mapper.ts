import { LoginDto } from "../dto/login.dto";

class LoginMapper {
    fromControllerToService(dto: LoginDto): LoginDto {
        return {
            email: dto.email,
            password: dto.password,
        };
    }
}

export const loginMapper = new LoginMapper();