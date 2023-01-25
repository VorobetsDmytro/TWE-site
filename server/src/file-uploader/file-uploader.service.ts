import { Injectable } from '@nestjs/common';
import { v4 } from "uuid";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FileUploaderService {
    uploadFile(file: Express.Multer.File, dirPath: string): string {
        const filePath = this.generateFileName(file, dirPath);
        if(!fs.existsSync(dirPath))
            fs.mkdirSync(dirPath, {recursive: true});
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
    }

    generateFileName(file: Express.Multer.File, dirPath: string): string {
        const extension = file.originalname.split('.').pop();
        let filePath;
        do {
            const fileName = v4();
            filePath = path.resolve(dirPath, fileName) + `.${extension}`;
        } while (fs.existsSync(filePath));
        return filePath;
    }

    deleteFile(filePath: string): string | null {
        if(!fs.existsSync(filePath))
            return null;
        fs.unlinkSync(filePath);
        return filePath;
    }
}
