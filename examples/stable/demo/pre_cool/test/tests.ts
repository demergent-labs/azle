import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/hello_world/hello_world.did';

export function getTests(helloWorldCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('gets original message', async () => {
            const result = await helloWorldCanister.getMessage();

            expect(result).toBe('Hello world!');
        });

        it('sets a new message', async () => {
            const result =
                await helloWorldCanister.setMessage('Goodbye world!');

            expect(result).toBeUndefined();
        });

        it('gets persisted new message', async () => {
            const result = await helloWorldCanister.getMessage();

            expect(result).toBe('Goodbye world!');
        });
    };
}
