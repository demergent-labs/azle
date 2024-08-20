import fc from 'fast-check';

import { Test } from '../../test';
import { VoidArb } from '../candid/primitive/void';
import { Api } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    generateMethodImplementation,
    MethodImplementationLocation,
    MethodImplementationLocationArb,
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
    api: Api;
    methodImplementationLocation?: MethodImplementationLocation;
}): fc.Arbitrary<InspectMessageMethod> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties'),
            VoidArb(constraints.api),
            MethodImplementationLocationArb,
            UniqueIdentifierArb('globalNames')
        )
        .map(
            ([
                functionName,
                returnType,
                defaultMethodImplementationLocation,
                methodName
            ]): InspectMessageMethod => {
                const methodImplementationLocation =
                    constraints.api === 'class'
                        ? 'INLINE'
                        : constraints.methodImplementationLocation ??
                          defaultMethodImplementationLocation;

                const inspectMessageImports =
                    constraints.api === 'functional'
                        ? ['ic']
                        : ['caller', 'acceptMessage', 'methodName'];
                const imports = new Set([
                    'inspectMessage',
                    ...inspectMessageImports
                ]);

                const methodImplementation = generateMethodImplementation(
                    [],
                    returnType,
                    constraints.generateBody,
                    methodImplementationLocation,
                    methodName,
                    constraints.api
                );

                const globalDeclarations =
                    methodImplementationLocation === 'STANDALONE'
                        ? [methodImplementation]
                        : [];

                const sourceCode =
                    constraints.api === 'functional'
                        ? `${functionName}: inspectMessage(${
                              methodImplementationLocation === 'STANDALONE'
                                  ? methodName
                                  : methodImplementation
                          })`
                        : `@inspectMessage\n${functionName}${methodImplementation}`;

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
