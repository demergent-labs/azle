import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(tEcdsaCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'dummy test',
            test: async () => {
                await tEcdsaCanister.publicKey();
                return {
                    Ok: true
                };
            }
        },
        {
            name: 'public key',
            test: async () => {
                const result = await tEcdsaCanister.publicKey();
                return {
                    Ok: 'ok' in result && result.ok.publicKey.length === 33
                };
            },
            skip: true
        },
        {
            name: 'sign message',
            test: async () => {
                const messageHash = [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1
                ];
                const result = await tEcdsaCanister.sign(messageHash);
                return {
                    Ok: 'ok' in result && result.ok.signature.length === 64
                };
            },
            skip: true
        }
    ];
}
