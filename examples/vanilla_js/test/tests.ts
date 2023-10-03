import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/vanilla_js/vanilla_js.did';

export function getTests(vanillaJsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'relativeImport',
            test: async () => {
                const result = await vanillaJsCanister.relativeImport();

                return {
                    Ok: result === 'relative import'
                };
            }
        },
        {
            name: 'packageImport',
            test: async () => {
                const result = await vanillaJsCanister.packageImport('hello');

                return {
                    Ok:
                        result ===
                        'ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193'
                };
            }
        },
        {
            name: 'builtin',
            test: async () => {
                const result = await vanillaJsCanister.builtin();

                return {
                    Ok: result === 11n
                };
            }
        }
    ];
}
