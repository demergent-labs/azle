import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../dfx_generated/update/update.did';

export function getTests(updateCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'simpleUpdate',
            test: async () => {
                const result =
                    await updateCanister.simpleUpdate('Why hello there');

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'getCurrentMessage',
            test: async () => {
                const result = await updateCanister.getCurrentMessage();

                return {
                    Ok: result === 'Why hello there'
                };
            }
        }
    ];
}
