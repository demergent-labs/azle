import fc from 'fast-check';

import { Test } from '../../../test';
import { VoidArb } from '../candid/primitive/void';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    CallbackLocation,
    CallbackLocationArb,
    generateCallback,
    TestsGenerator
} from '.';

export type InspectMessageMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[][];
};

export function InspectMessageMethodArb(constraints: {
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
            ]): InspectMessageMethod => {
                const callbackLocation =
                    constraints.callbackLocation ?? defaultCallbackLocation;

                const imports = new Set(['inspectMessage', 'ic']);

                const callback = generateCallback(
                    [],
                    returnType,
                    constraints.generateBody,
                    callbackLocation,
                    callbackName
                );

                const globalDeclarations =
                    callbackLocation === 'STANDALONE' ? [callback] : [];

                const sourceCode = `${functionName}: inspectMessage(${
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
