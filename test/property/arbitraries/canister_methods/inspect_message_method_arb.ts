import fc from 'fast-check';

import { Test } from '../../test';
import { BoolArb } from '../candid/primitive/bool';
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
            BoolArb({ ...context, constraints: {} }),
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
                        : (constraints.methodImplementationLocation ??
                          defaultMethodImplementationLocation);

                const imports = new Set(['inspectMessage']);

                const methodImplementation = generateMethodImplementation(
                    [],
                    returnType,
                    generator.generateBody,
                    methodImplementationLocation,
                    functionName,
                    methodName,
                    api,
                    api === 'class'
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
