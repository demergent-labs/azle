import fc from 'fast-check';

import { Test } from '../../test';
import { VoidArb } from '../candid/primitive/void';
import { Syntax } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    CallbackLocation,
    CallbackLocationArb,
    generateCallback,
    TestsGenerator
} from '.';

export type PreUpgradeMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[][];
};

export function PreUpgradeMethodArb(constraints: {
    generateBody: BodyGenerator;
    generateTests: TestsGenerator;
    syntax: Syntax;
    callbackLocation?: CallbackLocation;
}): fc.Arbitrary<PreUpgradeMethod> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties'),
            VoidArb(constraints.syntax),
            CallbackLocationArb,
            UniqueIdentifierArb('globalNames')
            // TODO: This unique id would be better named globalScope or something
            // But needs to match the same scope as typeDeclarations so I'm using
            // that for now.
        )
        .map(
            ([
                functionName,
                returnType,
                defaultCallbackLocation,
                callbackName
            ]): PreUpgradeMethod => {
                const callbackLocation =
                    constraints.syntax === 'class'
                        ? 'INLINE'
                        : constraints.callbackLocation ??
                          defaultCallbackLocation;

                const imports = new Set(['preUpgrade']);

                const callback = generateCallback(
                    [],
                    returnType,
                    constraints.generateBody,
                    callbackLocation,
                    callbackName,
                    constraints.syntax
                );

                const globalDeclarations =
                    callbackLocation === 'STANDALONE' ? [callback] : [];

                const sourceCode =
                    constraints.syntax === 'functional'
                        ? `${functionName}: preUpgrade(${
                              callbackLocation === 'STANDALONE'
                                  ? callbackName
                                  : callback
                          })`
                        : `@preUpgrade\n${functionName}${callback}`;

                const tests = constraints.generateTests(
                    functionName,
                    [],
                    returnType
                );

                return {
                    imports,
                    globalDeclarations,
                    sourceCode,
                    tests
                };
            }
        );
}
