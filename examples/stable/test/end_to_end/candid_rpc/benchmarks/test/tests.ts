import { ActorSubclass } from '@dfinity/agent';
import { please, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/benchmarks/benchmarks.did';

export function getTests(actor: ActorSubclass<_SERVICE>): Test {
    return () => {
        please('benchmark blobInitStack with 1 iteration', async () => {
            await actor.blobInitStack(1);
        });

        please('benchmark blobInitStack with 10 iterations', async () => {
            await actor.blobInitStack(10);
        });

        please('benchmark blobInitStack with 100 iterations', async () => {
            await actor.blobInitStack(100);
        });

        please('benchmark blobInitStack with 1_000 iterations', async () => {
            await actor.blobInitStack(1_000);
        });
    };
}
