import { Controller, Get, HttpException, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { TWE_BUILD_PATH } from 'src/paths/paths';

@Controller('file')
export class FileController {
    @Get('/twe/download')
    async tweDownload() {
        if(!fs.existsSync(TWE_BUILD_PATH))
            throw new HttpException('TWE build was not found.', 404);
        const file = fs.createReadStream(TWE_BUILD_PATH);
        return new StreamableFile(file);
    }
}
