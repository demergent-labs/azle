import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/init/init.did';

export function getTests(initCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getUser',
            test: async () => {
                const result = await initCanister.getUser();

                return {
                    Ok: result.length === 1 && result[0].id === '0'
                };
            }
        },
        {
            name: 'getReaction',
            test: async () => {
                const result = await initCanister.getReaction();

                return {
                    Ok: result.length === 1 && 'Fire' in result[0]
                };
            }
        },
        {
            name: 'getOwner',
            test: async () => {
                const result = await initCanister.getOwner();

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        }
    ];
}
