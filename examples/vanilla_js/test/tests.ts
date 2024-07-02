import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/vanilla_js/vanilla_js.did';

export function getTests(vanillaJsCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('relativeImport', async () => {
            const result = await vanillaJsCanister.relativeImport();

            expect(result).toBe('relative import');
        });

        it('packageImport', async () => {
            const result = await vanillaJsCanister.packageImport('hello');

            expect(result).toBe(
                'ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193'
            );
        });

        it('builtin', async () => {
            const result = await vanillaJsCanister.builtin();

            expect(result).toBe(11n);
        });
    };
}
