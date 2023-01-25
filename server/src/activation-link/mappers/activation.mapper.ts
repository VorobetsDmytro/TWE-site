import { ActivationDto } from "../dto/activation.dto";

class ActivationMapper {
    fromControllerToService(dto: ActivationDto): ActivationDto {
        return {
            password: dto.password
        };
    }
}

export const activationMapper = new ActivationMapper();