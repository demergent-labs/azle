import fc from 'fast-check';

import {
    Variant,
    VariantArb
} from '../../../arbitraries/candid/constructed/variant_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

const VariantTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        fc.uniqueArray(VariantArb, {
            selector: (entry) => entry.src.candidType
        }),
        VariantArb
    )
    .map(([functionName, paramVariants, defaultReturnVariant]): TestSample => {
        const imports = new Set([
            ...paramVariants.flatMap((variant) => [...variant.src.imports]),
            ...defaultReturnVariant.src.imports
        ]);

        const candidTypeDeclarations = [
            ...paramVariants.map(
                (variant) => variant.src.typeDeclaration ?? ''
            ),
            defaultReturnVariant.src.typeDeclaration ?? ''
        ];

        const paramNames = paramVariants.map((_, index) => `param${index}`);
        const paramCandidTypes = paramVariants
            .map((variant) => variant.src.candidType)
            .join(', ');

        const returnCandidType =
            paramVariants[0]?.src?.candidType ??
            defaultReturnVariant.src.candidType;

        const body = generateBody(
            paramNames,
            paramVariants,
            defaultReturnVariant
        );

        const test = generateTest(
            functionName,
            paramVariants,
            defaultReturnVariant
        );

        return {
            imports,
            functionName,
            candidTypeDeclarations,
            paramCandidTypes,
            returnCandidType,
            paramNames,
            body,
            test
        };
    });

runPropTests(VariantTestArb);

function generateBody(
    paramNames: string[],
    paramVariants: CandidMeta<Variant>[],
    returnVariant: CandidMeta<Variant>
): string {
    const paramsAreVariants = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'object' || Object.keys(${paramName}).length !== 1) throw new Error('${paramName} must be a Variant');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = paramVariants
        .map((variant, index) => {
            const paramName = `param${index}`;

            return `if (Object.keys(${paramName})[0] !== "${
                Object.keys(variant.value)[0]
            }") throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    const returnStatement = paramNames[0]
        ? `${paramNames[0]}`
        : returnVariant.src.valueLiteral;

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreVariants}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramVariants: CandidMeta<Variant>[],
    returnVariant: CandidMeta<Variant>
): Test {
    const expectedResult = paramVariants[0]?.value ?? returnVariant.value;
    const equals =
        paramVariants[0]?.equals ?? ((a: any, b: any) => a.None === b.None);
    return {
        name: `variant ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/variant/test');

            const result = await actor[functionName](
                ...paramVariants.map((variant) => variant.value)
            );

            return {
                Ok: equals(result, expectedResult)
            };
        }
    };
}
