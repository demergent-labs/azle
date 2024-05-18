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

import { type DogsJson, DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {}

    @Get('get')
    get(): string {
        return this.dogsService.get();
    }

    @Post('post')
    post(): string {
        return this.dogsService.post();
    }

    @Put('put')
    put(): string {
        return this.dogsService.put();
    }

    @Patch('patch')
    patch(): string {
        return this.dogsService.patch();
    }

    @Delete('delete')
    delete(): string {
        return this.dogsService.delete();
    }

    @Get('json')
    json(): DogsJson {
        return this.dogsService.json();
    }

    @Get('header')
    header(
        @Headers('X-Dogs-Header-Key') header: 'DogsHeaderValue'
    ): 'DogsHeaderValue' {
        return header;
    }

    @Get('http-code')
    @HttpCode(418)
    httpCode(): string {
        return `Dogs I'm a teapot`;
    }

    @Get('query')
    query(@Query() query: { hello: 'DogsQuery' }): 'DogsQuery' {
        return query.hello;
    }

    @Post('body')
    body(@Body() body: { hello: 'DogsBody' }): 'DogsBody' {
        return body.hello;
    }

    @Get('express-request')
    expressRequest(
        @Req() request: Request<any, any, any, { hello: 'DogsExpressRequest' }>
    ): 'DogsExpressRequest' {
        return request.query.hello;
    }

    @Get('express-response')
    expressResponse(@Res() response: Response) {
        response.send('Dogs Express Response');
    }
}
