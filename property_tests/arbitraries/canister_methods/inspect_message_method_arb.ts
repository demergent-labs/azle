import fc from 'fast-check';

import { Test } from '../../test';
import { VoidArb } from '../candid/primitive/void';
import { Context } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    CanisterMethodConstraints,
    generateMethodImplementation,
    MethodImplementationLocationArb,
    TestsGenerator
} from '.';

export type InspectMessageMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[][];
};

export function InspectMessageMethodArb(
    context: Context<CanisterMethodConstraints>,
    generator: {
        generateBody: BodyGenerator;
        generateTests: TestsGenerator;
    }
): fc.Arbitrary<InspectMessageMethod> {
    const api = context.api;
    const constraints = context.constraints;
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties'),
            VoidArb({ ...context, constraints: {} }),
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
                    api === 'class'
                        ? 'INLINE'
                        : constraints.methodImplementationLocation ??
                          defaultMethodImplementationLocation;

                const inspectMessageImports =
                    api === 'functional'
                        ? ['ic']
                        : ['caller', 'acceptMessage', 'methodName'];
                const imports = new Set([
                    'inspectMessage',
                    ...inspectMessageImports
                ]);

                const methodImplementation = generateMethodImplementation(
                    [],
                    returnType,
                    generator.generateBody,
                    methodImplementationLocation,
                    methodName,
                    api
                );

                const globalDeclarations =
                    methodImplementationLocation === 'STANDALONE'
                        ? [methodImplementation]
                        : [];

                const sourceCode =
                    api === 'functional'
                        ? `${functionName}: inspectMessage(${
                              methodImplementationLocation === 'STANDALONE'
                                  ? methodName
                                  : methodImplementation
                          })`
                        : `@inspectMessage\n${functionName}${methodImplementation}`;

                const tests = generator.generateTests(
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
