import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/multiple_canister_classes/multiple_canister_classes.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        const exportedCanisterClassNumbers = [2, 3, 5];
        const nonExportedCanisterClassNumbers = [1, 4, 6];

        it.each(exportedCanisterClassNumbers)(
            'returns correct string for methods%sText',
            async (canisterClassNumber) => {
                const result = await (canister as any)[
                    `methods${canisterClassNumber}Text`
                ]();
                expect(result).toStrictEqual(
                    `methods${canisterClassNumber}Text`
                );
            }
        );

        it.each(exportedCanisterClassNumbers)(
            'returns correct bigint for methods%sNat',
            async (canisterClassNumber) => {
                const result = await (canister as any)[
                    `methods${canisterClassNumber}Nat`
                ]();
                expect(result).toStrictEqual(BigInt(canisterClassNumber));
            }
        );

        it.each(exportedCanisterClassNumbers)(
            'returns correct Principal for methods%sPrincipal',
            async (canisterClassNumber) => {
                const result = await (canister as any)[
                    `methods${canisterClassNumber}Principal`
                ]();
                expect(result.toUint8Array()).toEqual(
                    new Uint8Array([canisterClassNumber])
                );
            }
        );

        it.each(nonExportedCanisterClassNumbers)(
            'has no update method methods%sText',
            async (canisterClassNumber) => {
                expect(() =>
                    execSync(
                        `dfx canister call multiple_canister_classes methods${canisterClassNumber}Text`,
                        {
                            encoding: 'utf-8'
                        }
                    )
                ).toThrow(
                    `Canister has no update method 'methods${canisterClassNumber}Text'`
                );
            }
        );

        it.each(nonExportedCanisterClassNumbers)(
            'has no update method methods%sNat',
            async (canisterClassNumber) => {
                expect(() =>
                    execSync(
                        `dfx canister call multiple_canister_classes methods${canisterClassNumber}Nat`,
                        {
                            encoding: 'utf-8'
                        }
                    )
                ).toThrow(
                    `Canister has no update method 'methods${canisterClassNumber}Nat'`
                );
            }
        );

        it.each(nonExportedCanisterClassNumbers)(
            'has no update method methods%sPrincipal',
            async (canisterClassNumber) => {
                expect(() =>
                    execSync(
                        `dfx canister call multiple_canister_classes methods${canisterClassNumber}Principal`,
                        {
                            encoding: 'utf-8'
                        }
                    )
                ).toThrow(
                    `Canister has no update method 'methods${canisterClassNumber}Principal'`
                );
            }
        );
    };
}
