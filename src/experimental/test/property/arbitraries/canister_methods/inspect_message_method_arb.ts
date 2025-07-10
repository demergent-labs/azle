import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Test } from '../../test';
import { BoolArb } from '../candid/primitive/bool_arb';
import { Context } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import { BodyGenerator, generateMethodImplementation, TestsGenerator } from '.';

export type InspectMessageMethod = {
    imports: Set<string>;
    sourceCode: string;
    tests: Test[][];
};

export function InspectMessageMethodArb(
    context: Context,
    generator: {
        generateBody: BodyGenerator;
        generateTests: TestsGenerator;
    }
): fc.Arbitrary<InspectMessageMethod> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties', 'property'),
            BoolArb({ ...context, constraints: {} }),
            UniqueIdentifierArb('globalNames')
        )
        .map(([functionName, returnType]): InspectMessageMethod => {
            const imports = new Set(['inspectMessage']);

            const methodImplementation = generateMethodImplementation(
                [],
                returnType,
                generator.generateBody,
                functionName,
                true
            );

            const escapedFunctionName = functionName.startsWith('"')
                ? `"${functionName.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
                : functionName;

            const sourceCode = `@inspectMessage\n${escapedFunctionName}${methodImplementation}`;

            const tests = generator.generateTests(functionName, [], returnType);

            return {
                imports,
                sourceCode,
                tests
            };
        });
}
