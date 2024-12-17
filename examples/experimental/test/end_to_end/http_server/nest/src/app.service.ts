import { Injectable } from '@nestjs/common';

export type AppJson = {
    hello: 'AppJson';
};

@Injectable()
export class AppService {
    get(): string {
        return 'get';
    }

    post(): string {
        return 'post';
    }

    put(): string {
        return 'put';
    }

    patch(): string {
        return 'patch';
    }

    delete(): string {
        return 'delete';
    }

    json(): AppJson {
        return {
            hello: 'AppJson'
        };
    }
}
