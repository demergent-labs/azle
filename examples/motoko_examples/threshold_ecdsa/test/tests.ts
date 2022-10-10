import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(tecdsa_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'dummy test',
            test: async () => {
                await tecdsa_canister.public_key();
                return {
                    ok: true
                };
            }
        },
        {
            name: 'public key',
            test: async () => {
                const result = await tecdsa_canister.public_key();
                return {
                    ok: 'ok' in result && result.ok.public_key.length === 33
                };
            },
            skip: true
        },
        {
            name: 'sign message',
            test: async () => {
                const message_hash = [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1
                ];
                const result = await tecdsa_canister.sign(message_hash);
                return {
                    ok: 'ok' in result && result.ok.signature.length === 64
                };
            },
            skip: true
        }
    ];
}
