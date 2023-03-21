import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/imports/imports.did';

export function getTests(imports_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getOne',
            test: async () => {
                const result = await imports_canister.getOne();

                return {
                    Ok: result === 'one'
                };
            }
        },
        {
            name: 'getTwo',
            test: async () => {
                const result = await imports_canister.getTwo();

                return {
                    Ok: result === 'two'
                };
            }
        },
        {
            name: 'getThree',
            test: async () => {
                const result = await imports_canister.getThree();

                return {
                    Ok: result === 'three'
                };
            }
        },
        {
            name: 'sha224Hash',
            test: async () => {
                const result = await imports_canister.sha224Hash('hello');

                return {
                    Ok:
                        result ===
                        'ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193'
                };
            }
        }
    ];
}
