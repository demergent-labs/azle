import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/imports/imports.did';

export function getTests(importsCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('calls a function from a local module', async () => {
            const result = await importsCanister.getOne();

            expect(result).toBe('one');
        });

        it('calls a second function from a local module', async () => {
            const result = await importsCanister.getTwo();

            expect(result).toBe('two');
        });

        it('calls a third function from a local module', async () => {
            const result = await importsCanister.getThree();

            expect(result).toBe('three');
        });

        it('calls a function from a third party module (sha224)', async () => {
            const result = await importsCanister.sha224Hash('hello');

            expect(result).toBe(
                'ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193'
            );
        });

        it('calls a function from a built in module (Math)', async () => {
            const result = await importsCanister.getMathMessage();

            expect(result).toBe(11n);
        });
    };
}
