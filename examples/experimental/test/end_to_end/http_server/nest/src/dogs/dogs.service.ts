import { Injectable } from '@nestjs/common';

export type DogsJson = {
    hello: 'DogsJson';
};

@Injectable()
export class DogsService {
    get(): string {
        return 'dogs get';
    }

    post(): string {
        return 'dogs post';
    }

    put(): string {
        return 'dogs put';
    }

    patch(): string {
        return 'dogs patch';
    }

    delete(): string {
        return 'dogs delete';
    }

    json(): DogsJson {
        return {
            hello: 'DogsJson'
        };
    }
}
