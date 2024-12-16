import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/counter/counter.did';

export function getTests(counterCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('reads the initialized value of a global counter', async () => {
            const result = await counterCanister.readCount();

            expect(result).toBe(0n);
        });

        it('increments a global counter', async () => {
            const result = await counterCanister.incrementCount();

            expect(result).toBe(1n);
        });

        it('increments a global counter that had previously been incremented', async () => {
            const result = await counterCanister.incrementCount();

            expect(result).toBe(2n);
        });

        it('increments a global counter that had twice been previously incremented', async () => {
            const result = await counterCanister.incrementCount();

            expect(result).toBe(3n);
        });

        it('reads the count of a global counter that has had its state maintained between calls', async () => {
            const result = await counterCanister.readCount();

            expect(result).toBe(3n);
        });
    };
}
