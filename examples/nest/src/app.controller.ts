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

import { type AppJson, AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('get')
    get(): string {
        return this.appService.get();
    }

    @Post('post')
    post(): string {
        return this.appService.post();
    }

    @Put('put')
    put(): string {
        return this.appService.put();
    }

    @Patch('patch')
    patch(): string {
        return this.appService.patch();
    }

    @Delete('delete')
    delete(): string {
        return this.appService.delete();
    }

    @Get('json')
    json(): AppJson {
        return this.appService.json();
    }

    @Get('header')
    header(
        @Headers('X-App-Header-Key') header: 'AppHeaderValue'
    ): 'AppHeaderValue' {
        return header;
    }

    @Get('http-code')
    @HttpCode(418)
    httpCode(): string {
        return `App I'm a teapot`;
    }

    @Get('query')
    query(@Query() query: { hello: 'AppQuery' }): 'AppQuery' {
        return query.hello;
    }

    @Post('body')
    body(@Body() body: { hello: 'AppBody' }): 'AppBody' {
        return body.hello;
    }

    @Get('express-request')
    expressRequest(
        @Req() request: Request<any, any, any, { hello: 'AppExpressRequest' }>
    ): 'AppExpressRequest' {
        return request.query.hello;
    }

    @Get('express-response')
    expressResponse(@Res() response: Response) {
        response.send('App Express Response');
    }
}
