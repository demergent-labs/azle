import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/imports/imports.did';

export function getTests(importsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getOne',
            test: async () => {
                const result = await importsCanister.getOne();

                return testEquality(result, 'one');
            }
        },
        {
            name: 'getTwo',
            test: async () => {
                const result = await importsCanister.getTwo();

                return testEquality(result, 'two');
            }
        },
        {
            name: 'getThree',
            test: async () => {
                const result = await importsCanister.getThree();

                return testEquality(result, 'three');
            }
        },
        {
            name: 'sha224Hash',
            test: async () => {
                const result = await importsCanister.sha224Hash('hello');

                return testEquality(
                    result,
                    'ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193'
                );
            }
        },
        {
            name: 'getMathMessage',
            test: async () => {
                const result = await importsCanister.getMathMessage();

                return testEquality(result, 11n);
            }
        }
    ];
}
