import fc from 'fast-check';

import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    TestsGenerator,
    CallbackLocation,
    generateCallback,
    CallbackLocationArb
} from '.';
import { Test } from '../../../test';
import { VoidArb } from '../candid/primitive/void';

export type PreUpgradeMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[][];
};

export function PreUpgradeMethodArb(constraints: {
    generateBody: BodyGenerator;
    generateTests: TestsGenerator;
    callbackLocation?: CallbackLocation;
}) {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterMethod'),
            VoidArb(),
            CallbackLocationArb,
            UniqueIdentifierArb('typeDeclaration')
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
                    constraints.callbackLocation ?? defaultCallbackLocation;

                const imports = new Set(['preUpgrade']);

                const callback = generateCallback(
                    [],
                    returnType,
                    constraints.generateBody,
                    callbackLocation,
                    callbackName
                );

                const globalDeclarations =
                    callbackLocation === 'STANDALONE' ? [callback] : [];

                const sourceCode = `${functionName}: preUpgrade(${
                    callbackLocation === 'STANDALONE' ? callbackName : callback
                })`;

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
