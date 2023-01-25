declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        POSTGRESQL_MAIN_URL: string;
        JWT_SECRET: string;
        STATIC_PATH: string;
        EMAIL_HOST: string;
        EMAIL_PORT: number;
        EMAIL_USER: string;
        EMAIL_PASS: string;
        FRONT_URL: string;
    }
}

declare namespace Express {
    namespace Multer {
        interface File {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            size: number;
            stream: Readable;
            destination: string;
            filename: string;
            path: string;
            buffer: Buffer;
        }
    }
    export interface User {
        id: string;
        email: string;
    }
}