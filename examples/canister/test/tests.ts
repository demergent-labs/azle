import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/canister/canister.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'canisterParam',
            test: async () => {
                const result = await canister.canisterParam(
                    Principal.fromText('aaaaa-aa')
                );

                return testEquality(result.toText(), 'aaaaa-aa');
            }
        },
        {
            name: 'canisterReturnType',
            test: async () => {
                const result = await canister.canisterReturnType();

                return testEquality(
                    result.toText(),
                    getCanisterId('some_canister')
                );
            }
        },
        {
            name: 'canisterNestedReturnType',
            test: async () => {
                const result = await canister.canisterNestedReturnType();

                return testEquality(
                    result.someCanister.toText(),
                    getCanisterId('some_canister')
                );
            }
        },
        {
            name: 'canisterList',
            test: async () => {
                const expected = [
                    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai'),
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
                ];
                const result = await canister.canisterList(expected);

                return testEquality(result, expected, {
                    toString: (principal: Principal) => principal.toText()
                });
            }
        },
        {
            name: 'canisterCrossCanisterCall',
            test: async () => {
                const result = await canister.canisterCrossCanisterCall(
                    Principal.fromText(getCanisterId('some_canister'))
                );

                return testEquality(result, 'SomeCanister update1');
            }
        }
    ];
}
