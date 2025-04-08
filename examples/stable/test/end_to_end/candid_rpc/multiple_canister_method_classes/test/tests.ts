import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/multiple_canister_method_classes/multiple_canister_method_classes.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('has no update method methods1Text', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods1Text`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods1Text'");
        });
        it('has no update method methods1Nat', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods1Nat`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods1Nat'");
        });
        it('has no update method methods1Principal', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods1Principal`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods1Principal'");
        });

        it('returns correct string for methods2Text', async () => {
            const result = await canister.methods2Text();
            expect(result).toStrictEqual('methods2Text');
        });
        it('returns correct bigint for methods2Nat', async () => {
            const result = await canister.methods2Nat();
            expect(result).toStrictEqual(2n);
        });
        it('returns correct Principal for methods2Principal', async () => {
            const result = await canister.methods2Principal();
            expect(result.toUint8Array()).toEqual(new Uint8Array([2]));
        });

        it('returns correct string for methods3Text', async () => {
            const result = await canister.methods3Text();
            expect(result).toStrictEqual('methods3Text');
        });
        it('returns correct bigint for methods3Nat', async () => {
            const result = await canister.methods3Nat();
            expect(result).toStrictEqual(3n);
        });
        it('returns correct Principal for methods3Principal', async () => {
            const result = await canister.methods3Principal();
            expect(result.toUint8Array()).toEqual(new Uint8Array([3]));
        });

        it('has no update method methods4Text', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods4Text`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods4Text'");
        });
        it('has no update method methods4Nat', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods4Nat`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods4Nat'");
        });
        it('has no update method methods4Principal', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods4Principal`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods4Principal'");
        });

        it('returns correct string for methods5Text', async () => {
            const result = await canister.methods5Text();
            expect(result).toStrictEqual('methods5Text');
        });
        it('returns correct bigint for methods5Nat', async () => {
            const result = await canister.methods5Nat();
            expect(result).toStrictEqual(5n);
        });
        it('returns correct Principal for methods5Principal', async () => {
            const result = await canister.methods5Principal();
            expect(result.toUint8Array()).toEqual(new Uint8Array([5]));
        });

        it('has no update method methods6Text', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods6Text`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods6Text'");
        });
        it('has no update method methods6Nat', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods6Nat`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods6Nat'");
        });
        it('has no update method methods6Principal', async () => {
            expect(() =>
                execSync(
                    `dfx canister call multiple_canister_method_classes methods6Principal`,
                    {
                        encoding: 'utf-8'
                    }
                )
            ).toThrow("Canister has no update method 'methods6Principal'");
        });
    };
}
