import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/threshold_ecdsa/threshold_ecdsa.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(tEcdsaCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'public key',
            test: async () => {
                const result = await tEcdsaCanister.publicKey();
                return {
                    Ok: result.publicKey.length === 33
                };
            }
        },
        {
            name: 'sign message',
            test: async () => {
                const messageHash = [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1
                ];
                const result = await tEcdsaCanister.sign(messageHash as any);
                return {
                    Ok: result.signature.length === 64
                };
            }
        }
    ];
}
