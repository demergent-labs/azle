import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { expect, it, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/multiple_canister_method_classes/multiple_canister_method_classes.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe.each([2, 3, 5])(
            'canister classes were exported from the main entrypoint',
            (canisterClassNumber) => {
                it(`returns correct string for methods${canisterClassNumber}Text`, async () => {
                    const result = await (canister as any)[
                        `methods${canisterClassNumber}Text`
                    ]();
                    expect(result).toStrictEqual(
                        `methods${canisterClassNumber}Text`
                    );
                });

                it(`returns correct bigint for methods${canisterClassNumber}Nat`, async () => {
                    const result = await (canister as any)[
                        `methods${canisterClassNumber}Nat`
                    ]();
                    expect(result).toStrictEqual(BigInt(canisterClassNumber));
                });

                it(`returns correct Principal for methods${canisterClassNumber}Principal`, async () => {
                    const result = await (canister as any)[
                        `methods${canisterClassNumber}Principal`
                    ]();
                    expect(result.toUint8Array()).toEqual(
                        new Uint8Array([canisterClassNumber])
                    );
                });
            }
        );

        describe.each([1, 4, 6])(
            'canister classes were not exported from the main entrypoint',
            (canisterClassNumber) => {
                it(`has no update method methods${canisterClassNumber}Text`, async () => {
                    expect(() =>
                        execSync(
                            `dfx canister call multiple_canister_method_classes methods${canisterClassNumber}Text`,
                            {
                                encoding: 'utf-8'
                            }
                        )
                    ).toThrow(
                        `Canister has no update method 'methods${canisterClassNumber}Text'`
                    );
                });

                it(`has no update method methods${canisterClassNumber}Nat`, async () => {
                    expect(() =>
                        execSync(
                            `dfx canister call multiple_canister_method_classes methods${canisterClassNumber}Nat`,
                            {
                                encoding: 'utf-8'
                            }
                        )
                    ).toThrow(
                        `Canister has no update method 'methods${canisterClassNumber}Nat'`
                    );
                });

                it(`has no update method methods${canisterClassNumber}Principal`, async () => {
                    expect(() =>
                        execSync(
                            `dfx canister call multiple_canister_method_classes methods${canisterClassNumber}Principal`,
                            {
                                encoding: 'utf-8'
                            }
                        )
                    ).toThrow(
                        `Canister has no update method 'methods${canisterClassNumber}Principal'`
                    );
                });
            }
        );
    };
}
