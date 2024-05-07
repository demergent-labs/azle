import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Patch,
    Post,
    Put,
    Query,
    Req,
    Res
} from '@nestjs/common';
import { Request, Response } from 'express';

import { type CatsJson, CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get('get')
    get(): string {
        return this.catsService.get();
    }

    @Post('post')
    post(): string {
        return this.catsService.post();
    }

    @Put('put')
    put(): string {
        return this.catsService.put();
    }

    @Patch('patch')
    patch(): string {
        return this.catsService.patch();
    }

    @Delete('delete')
    delete(): string {
        return this.catsService.delete();
    }

    @Get('json')
    json(): CatsJson {
        return this.catsService.json();
    }

    @Get('header')
    header(
        @Headers('X-Cats-Header-Key') header: 'CatsHeaderValue'
    ): 'CatsHeaderValue' {
        return header;
    }

    @Get('http-code')
    @HttpCode(418)
    httpCode(): string {
        return `Cats I'm a teapot`;
    }

    @Get('query')
    query(@Query() query: { hello: 'CatsQuery' }): 'CatsQuery' {
        return query.hello;
    }

    @Post('body')
    body(@Body() body: { hello: 'CatsBody' }): 'CatsBody' {
        return body.hello;
    }

    @Get('express-request')
    expressRequest(
        @Req() request: Request<any, any, any, { hello: 'CatsExpressRequest' }>
    ): 'CatsExpressRequest' {
        return request.query.hello;
    }

    @Get('express-response')
    expressResponse(@Res() response: Response) {
        response.send('Cats Express Response');
    }
}
