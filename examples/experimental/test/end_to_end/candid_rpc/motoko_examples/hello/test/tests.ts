import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../dfx_generated/hello/hello.did';

export function getTests(hello_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('greets the given entity', async () => {
            const result = await hello_canister.greet('everyone');

            expect(result).toBe('Hello, everyone!');
        });

        it('greets nobody', async () => {
            const result = await hello_canister.greet('');

            expect(result).toBe('Hello, !');
        });
    };
}
