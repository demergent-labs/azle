import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/robust_imports/robust_imports.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    robustImportsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'query',
            test: async () => {
                const result = await robustImportsCanister.simpleQuery();

                return {
                    Ok: result === 'This is a query function'
                };
            }
        }
    ];
}
