import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../dfx_generated/update/update.did';

export function getTests(updateCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('simpleUpdate', async () => {
            const result = await updateCanister.simpleUpdate('Why hello there');

            expect(result).toBeUndefined();
        });

        it('getCurrentMessage', async () => {
            const result = await updateCanister.getCurrentMessage();

            expect(result).toBe('Why hello there');
        });
    };
}
