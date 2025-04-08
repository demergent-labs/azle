import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/multiple_canister_method_classes/multiple_canister_method_classes.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('methods1Text returns correct string', async () => {
            const result = await canister.methods1Text();
            expect(result).toStrictEqual('methods1Text');
        });

        it('methods1Nat returns correct bigint', async () => {
            const result = await canister.methods1Nat();
            expect(result).toStrictEqual(1n);
        });

        it('methods1Principal returns correct Principal', async () => {
            const result = await canister.methods1Principal();
            expect(result.toUint8Array()).toEqual(new Uint8Array([1]));
        });

        it('methods2Text returns correct string', async () => {
            const result = await canister.methods2Text();
            expect(result).toStrictEqual('methods2Text');
        });

        it('methods2Nat returns correct bigint', async () => {
            const result = await canister.methods2Nat();
            expect(result).toStrictEqual(2n);
        });

        it('methods2Principal returns correct Principal', async () => {
            const result = await canister.methods2Principal();
            expect(result.toUint8Array()).toEqual(new Uint8Array([2]));
        });

        it('methods3Text returns correct string', async () => {
            const result = await canister.methods3Text();
            expect(result).toStrictEqual('methods3Text');
        });

        it('methods3Nat returns correct bigint', async () => {
            const result = await canister.methods3Nat();
            expect(result).toStrictEqual(3n);
        });

        it('methods3Principal returns correct Principal', async () => {
            const result = await canister.methods3Principal();
            expect(result.toUint8Array()).toEqual(new Uint8Array([3]));
        });
    };
}
