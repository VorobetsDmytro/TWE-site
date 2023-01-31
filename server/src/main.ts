import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { STATIC_PATH } from './paths/paths';

declare global {
    namespace Express {
        interface Request {
            user?: User | undefined;
        }
    }
}

const start = async () => {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
    app.useGlobalPipes(new ValidationPipe);
    app.useStaticAssets(STATIC_PATH);
    await app.listen(PORT, () => console.log(`The server has been started on port ${PORT}.`));
}

start();