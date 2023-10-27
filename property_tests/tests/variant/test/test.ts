import fc from 'fast-check';

import { VariantArb } from '../../../arbitraries/candid/constructed/variant_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const VariantTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        fc.uniqueArray(VariantArb, {
            selector: (entry) => entry.src.candidType
        })
    )
    .map(([functionName, variants]): TestSample => {
        const candidTypeDeclarations = variants.map(
            (variant) => variant.src.typeDeclaration ?? ''
        );
        const paramCandidTypes = variants.map(
            (variant) => variant.src.candidType
        );
        const returnCandidType =
            variants[0]?.src?.candidType ?? 'Variant({None: Null})';
        const paramNames = variants.map((_, index) => `param${index}`);

        const paramsAreVariants = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'object' || Object.keys(${paramName}).length !== 1) throw new Error('${paramName} must be a Variant');`;
            })
            .join('\n');

        const paramsCorrectlyOrdered = variants
            .map((variant, index) => {
                const paramName = `param${index}`;

                return `if (Object.keys(${paramName})[0] !== "${
                    Object.keys(variant.value)[0]
                }") throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        const returnStatement = paramNames[0]
            ? `${paramNames[0]}`
            : '{ None: null }';

        const expectedResult = variants[0]?.value ?? { None: null };

        const imports = Array.from(
            variants.reduce((acc, variant) => {
                return new Set([...acc, ...variant.src.imports]);
            }, new Set<string>())
        );

        return {
            functionName,
            imports,
            candidTypeDeclarations,
            paramCandidTypes: paramCandidTypes.join(', '),
            returnCandidType,
            paramNames,
            body: `
                ${paramsCorrectlyOrdered}

                ${paramsAreVariants}

                return ${returnStatement};
            `,
            test: {
                name: `variant ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/variant/test');

                    const result = await actor[functionName](
                        ...variants.map((variant) => variant.value)
                    );

                    return {
                        Ok: variantsAreEqual(result, expectedResult)
                    };
                }
            }
        };
    });

runPropTests(VariantTestArb);

function variantsAreEqual(result: Object, expectedResult: Object): boolean {
    if (typeof result !== 'object' || typeof expectedResult !== 'object') {
        return false;
    }

    const resultEntries = Object.entries(result);
    const expectedResultEntries = Object.entries(expectedResult);

    if (resultEntries.length !== 1 || expectedResultEntries.length !== 1) {
        return false;
    }

    const [resultKey, resultValue] = resultEntries[0];
    const [expectedResultKey, expectedResultValue] = expectedResultEntries[0];

    if (resultKey !== expectedResultKey) {
        return false;
    }

    if (resultValue !== expectedResultValue) {
        return false;
    }

    return true;
}
