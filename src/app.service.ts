import {Injectable} from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
    private readonly homePageHtml: string;

    constructor() {
        const htmlPath = 'src/homePage.html';
        this.homePageHtml = fs.readFileSync(htmlPath, 'utf8');
    }

    getHomePage(): string {
        return this.homePageHtml
    }
}
