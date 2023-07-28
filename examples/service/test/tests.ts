import { getCanisterId, Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/service/service.did';
import { ActorSubclass } from '@dfinity/agent';
import { execSync } from 'child_process';

// TODO these tests should be rewritten to use @dfinity/agent once this issue is resolved: https://github.com/dfinity/agent-js/issues/702
// TODO this issue also needs to be resolved: https://forum.dfinity.org/t/services-wont-deserialize-properly-if-functions-arent-in-alphabetical-order/20885
export function getTests(serviceCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'serviceParam',
            test: async () => {
                const result = execSync(
                    `dfx canister call service serviceParam '(service "aaaaa-aa")'`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === '(service "aaaaa-aa")'
                };
            }
        },
        {
            name: 'serviceReturnType',
            test: async () => {
                const result = execSync(
                    `dfx canister call service serviceReturnType`
                )
                    .toString()
                    .trim();

                return {
                    Ok:
                        result ===
                        `(service "${getCanisterId('some_service')}")`
                };
            }
        },
        {
            name: 'serviceNestedReturnType',
            test: async () => {
                const result = execSync(
                    `dfx canister call service serviceNestedReturnType`
                )
                    .toString()
                    .trim();

                return {
                    Ok:
                        result ===
                        `(record { someService = service "${getCanisterId(
                            'some_service'
                        )}" })`
                };
            }
        },
        {
            name: 'serviceList',
            test: async () => {
                const result = execSync(
                    `dfx canister call service serviceList '(vec { service "r7inp-6aaaa-aaaaa-aaabq-cai"; service "rrkah-fqaaa-aaaaa-aaaaq-cai" })'`
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
            name: 'serviceCrossCanisterCall',
            test: async () => {
                const result = execSync(
                    `dfx canister call service serviceCrossCanisterCall '(service "${getCanisterId(
                        'some_service'
                    )}")'`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result === '(variant { Ok = "SomeService update1" })'
                };
            }
        }
    ];
}
