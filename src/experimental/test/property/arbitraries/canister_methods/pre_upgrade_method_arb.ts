import fc from 'fast-check';

import { Test } from '../../test';
import { VoidArb } from '../candid/primitive/void_arb';
import { Context } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import {
    BodyGenerator,
    CanisterMethodConstraints,
    generateMethodImplementation,
    MethodImplementationLocationArb,
    TestsGenerator
} from '.';

export type PreUpgradeMethod = {
    imports: Set<string>;
    globalDeclarations: string[];
    sourceCode: string;
    tests: Test[][];
};

export function PreUpgradeMethodArb(
    context: Context<CanisterMethodConstraints>,
    generator: {
        generateBody: BodyGenerator;
        generateTests: TestsGenerator;
    }
): fc.Arbitrary<PreUpgradeMethod> {
    const api = context.api;
    const constraints = context.constraints;
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties', 'property'),
            VoidArb({ ...context, constraints: {} }),
            MethodImplementationLocationArb,
            UniqueIdentifierArb('globalNames')
            // TODO: This unique id would be better named globalScope or something
            // But needs to match the same scope as typeDeclarations so I'm using
            // that for now.
        )
        .map(
            ([
                functionName,
                returnType,
                defaultMethodImplementationLocation,
                methodName
            ]): PreUpgradeMethod => {
                const methodImplementationLocation =
                    api === 'class'
                        ? 'INLINE'
                        : (constraints.methodImplementationLocation ??
                          defaultMethodImplementationLocation);

                const imports = new Set(['preUpgrade']);

                const methodImplementation = generateMethodImplementation(
                    [],
                    returnType,
                    generator.generateBody,
                    methodImplementationLocation,
                    functionName,
                    methodName,
                    api
                );

                const globalDeclarations =
                    methodImplementationLocation === 'STANDALONE'
                        ? [methodImplementation]
                        : [];

                const escapedFunctionName = functionName.startsWith('"')
                    ? `"${functionName.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
                    : functionName;

                const sourceCode =
                    api === 'functional'
                        ? `${escapedFunctionName}: preUpgrade(${
                              methodImplementationLocation === 'STANDALONE'
                                  ? methodName
                                  : methodImplementation
                          })`
                        : `@preUpgrade\n${escapedFunctionName}${methodImplementation}`;

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
