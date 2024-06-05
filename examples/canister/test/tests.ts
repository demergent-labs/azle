import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/canister/canister.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('passes a canisters as an argument', async () => {
            const managementCanister = Principal.fromText('aaaaa-aa');
            const result = await canister.canisterParam(managementCanister);

            expect(result).toStrictEqual(managementCanister);
        });

        it('receives a canisters as a return value', async () => {
            const result = await canister.canisterReturnType();

            expect(result.toText()).toBe(getCanisterId('some_canister'));
        });

        it('receive a nested canisters as a return value', async () => {
            const result = await canister.canisterNestedReturnType();

            expect(result.someCanister.toText()).toBe(
                getCanisterId('some_canister')
            );
        });

        it('receives canisters in a list as a return value', async () => {
            const canisterList = [
                Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai'),
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
            ];
            const result = await canister.canisterList(canisterList);

            expect(result).toStrictEqual(canisterList);
        });

        it('performs a cross canister call on a canister that was passed in as an argument', async () => {
            const result = await canister.canisterCrossCanisterCall(
                Principal.fromText(getCanisterId('some_canister'))
            );

            expect(result).toBe('SomeCanister update1');
        });
    };
}
