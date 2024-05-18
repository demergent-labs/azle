import { Injectable } from '@nestjs/common';

export type CatsJson = {
    hello: 'CatsJson';
};

@Injectable()
export class CatsService {
    get(): string {
        return 'cats get';
    }

    post(): string {
        return 'cats post';
    }

    put(): string {
        return 'cats put';
    }

    patch(): string {
        return 'cats patch';
    }

    delete(): string {
        return 'cats delete';
    }

    json(): CatsJson {
        return {
            hello: 'CatsJson'
        };
    }
}
