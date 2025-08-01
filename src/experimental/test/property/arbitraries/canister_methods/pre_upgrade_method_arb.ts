import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Test } from '../../test';
import { VoidArb } from '../candid/primitive/void_arb';
import { Context } from '../types';
import { UniqueIdentifierArb } from '../unique_identifier_arb';
import { BodyGenerator, generateMethodImplementation, TestsGenerator } from '.';

export type PreUpgradeMethod = {
    imports: Set<string>;
    sourceCode: string;
    tests: Test[][];
};

export function PreUpgradeMethodArb(
    context: Context,
    generator: {
        generateBody: BodyGenerator;
        generateTests: TestsGenerator;
    }
): fc.Arbitrary<PreUpgradeMethod> {
    return fc
        .tuple(
            UniqueIdentifierArb('canisterProperties', 'property'),
            VoidArb({ ...context, constraints: {} }),
            UniqueIdentifierArb('globalNames')
            // TODO: This unique id would be better named globalScope or something
            // But needs to match the same scope as typeDeclarations so I'm using
            // that for now.
        )
        .map(([functionName, returnType]): PreUpgradeMethod => {
            const imports = new Set(['preUpgrade']);

            const methodImplementation = generateMethodImplementation(
                [],
                returnType,
                generator.generateBody,
                functionName
            );

            const escapedFunctionName = functionName.startsWith('"')
                ? `"${functionName.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
                : functionName;

            const sourceCode = `@preUpgrade\n${escapedFunctionName}${methodImplementation}`;

            const tests = generator.generateTests(functionName, [], returnType);

            return {
                imports,
                sourceCode,
                tests
            };
        });
}
