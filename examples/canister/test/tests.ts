import { getCanisterId, Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/canister/canister.did';
import { ActorSubclass } from '@dfinity/agent';
import { execSync } from 'child_process';

// TODO these tests should be rewritten to use @dfinity/agent once this issue is resolved: https://github.com/dfinity/agent-js/issues/702
// TODO this issue also needs to be resolved: https://forum.dfinity.org/t/services-wont-deserialize-properly-if-functions-arent-in-alphabetical-order/20885
export function getTests(canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'canisterParam',
            test: async () => {
                const result = execSync(
                    `dfx canister call canister canisterParam '(service "aaaaa-aa")'`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === '(service "aaaaa-aa")'
                };
            }
        },
        {
            name: 'canisterReturnType',
            test: async () => {
                const result = execSync(
                    `dfx canister call canister canisterReturnType`
                )
                    .toString()
                    .trim();

                return {
                    Ok:
                        result ===
                        `(service "${getCanisterId('some_canister')}")`
                };
            }
        },
        {
            name: 'canisterNestedReturnType',
            test: async () => {
                const result = execSync(
                    `dfx canister call canister canisterNestedReturnType`
                )
                    .toString()
                    .trim();

                return {
                    Ok:
                        result ===
                        `(record { someCanister = service "${getCanisterId(
                            'some_canister'
                        )}" })`
                };
            }
        },
        {
            name: 'canisterList',
            test: async () => {
                const result = execSync(
                    `dfx canister call canister canisterList '(vec { service "r7inp-6aaaa-aaaaa-aaabq-cai"; service "rrkah-fqaaa-aaaaa-aaaaq-cai" })'`
                )
                    .toString()
                    .trim();

                return {
                    Ok:
                        result ===
                        `(
  vec {
    service "r7inp-6aaaa-aaaaa-aaabq-cai";
    service "rrkah-fqaaa-aaaaa-aaaaq-cai";
  },
)`
                };
            }
        },
        {
            name: 'canisterCrossCanisterCall',
            test: async () => {
                const result = execSync(
                    `dfx canister call canister canisterCrossCanisterCall '(service "${getCanisterId(
                        'some_canister'
                    )}")'`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === '("SomeCanister update1")'
                };
            }
        }
    ];
}
