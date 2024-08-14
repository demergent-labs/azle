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

export type InspectMessageMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[][];
};

export function InspectMessageMethodArb(constraints: {
    generateBody: BodyGenerator;
    generateTests: TestsGenerator;
    syntax: Syntax;
    callbackLocation?: CallbackLocation;
}): fc.Arbitrary<InspectMessageMethod> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties'),
            VoidArb(constraints.syntax),
            CallbackLocationArb,
            UniqueIdentifierArb('globalNames')
        )
        .map(
            ([
                functionName,
                returnType,
                defaultCallbackLocation,
                callbackName
            ]): InspectMessageMethod => {
                const callbackLocation =
                    constraints.syntax === 'class'
                        ? 'INLINE'
                        : constraints.callbackLocation ??
                          defaultCallbackLocation;

                const inspectMessageImports =
                    constraints.syntax === 'functional'
                        ? ['ic']
                        : ['caller', 'acceptMessage', 'methodName'];
                const imports = new Set([
                    'inspectMessage',
                    ...inspectMessageImports
                ]);

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
                        ? `${functionName}: inspectMessage(${
                              callbackLocation === 'STANDALONE'
                                  ? callbackName
                                  : callback
                          })`
                        : `@inspectMessage` +
                          `\n` +
                          `${functionName}${callback}`;

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
