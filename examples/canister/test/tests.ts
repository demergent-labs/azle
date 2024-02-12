import { getCanisterId, Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/canister/canister.did';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export function getTests(canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'canisterParam',
            test: async () => {
                const result = await canister.canisterParam(
                    Principal.fromText('aaaaa-aa')
                );

                return {
                    Ok: result.toText() === 'aaaaa-aa'
                };
            }
        },
        {
            name: 'canisterReturnType',
            test: async () => {
                const result = await canister.canisterReturnType();

                return {
                    Ok: result.toText() === getCanisterId('some_canister')
                };
            }
        },
        {
            name: 'canisterNestedReturnType',
            test: async () => {
                const result = await canister.canisterNestedReturnType();

                return {
                    Ok:
                        result.someCanister.toText() ===
                        getCanisterId('some_canister')
                };
            }
        },
        {
            name: 'canisterList',
            test: async () => {
                const result = await canister.canisterList([
                    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai'),
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                ]);

                return {
                    Ok:
                        result.length === 2 &&
                        result[0].toText() === 'r7inp-6aaaa-aaaaa-aaabq-cai' &&
                        result[1].toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        },
        {
            name: 'canisterCrossCanisterCall',
            test: async () => {
                const result = await canister.canisterCrossCanisterCall(
                    Principal.fromText(getCanisterId('some_canister'))
                );

                return {
                    Ok: result === 'SomeCanister update1'
                };
            }
        }
    ];
}
