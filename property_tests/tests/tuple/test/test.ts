import fc from 'fast-check';

import {
    TupleArb,
    Tuple
} from '../../../arbitraries/candid/constructed/tuple_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { getActor, runPropTests } from '../../..';
import { AzleResult, Test } from '../../../../test';
import { Candid } from '../../../arbitraries/candid';

const TupleTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        fc.uniqueArray(TupleArb, {
            selector: (entry) => entry.src.candidType
        }),
        TupleArb
    )
    .map(([functionName, paramTuples, defaultReturnTuple]): TestSample => {
        const imports = new Set([
            ...paramTuples.flatMap((tuple) => [...tuple.src.imports]),
            ...defaultReturnTuple.src.imports
        ]);

        const candidTypeDeclarations = [
            ...paramTuples.map((tuple) => tuple.src.typeDeclaration ?? ''),
            defaultReturnTuple.src.typeDeclaration ?? ''
        ];

        const paramNames = paramTuples.map((_, index) => `param${index}`);

        const paramCandidTypes = paramTuples
            .map((tuple) => tuple.src.candidType)
            .join(', ');

        const returnTuple =
            paramTuples.length === 0 ? defaultReturnTuple : paramTuples[0];
        const returnCandidType = returnTuple.src.candidType;

        const body = generateBody(paramTuples, returnTuple);

        const test = generateTest(functionName, paramTuples, returnTuple);

        return {
            functionName,
            imports,
            candidTypeDeclarations,
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            test
        };
    });

runPropTests(TupleTestArb);

function generateBody(
    paramTuples: Candid<Tuple>[],
    returnTuple: Candid<Tuple>
): string {
    const paramsAreTuples = paramTuples
        .map((tuple, index) => {
            const paramName = `param${index}`;
            const fieldsCount = tuple.value.length;

            const paramIsArray = `Array.isArray(${paramName})`;
            const paramHasCorrectNumberOfFields = `${paramName}.length === ${fieldsCount}`;
            const throwError = `throw new Error('${paramName} must be a Tuple');`;

            return `if (!(${paramIsArray} && ${paramHasCorrectNumberOfFields})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = paramTuples
        .map((tuple, paramIndex): string => {
            const paramName = `param${paramIndex}`;

            const paramIsCorrectValue = `${paramName}.toString() === ${tuple.src.valueLiteral}.toString()`;

            const throwError = `throw new Error('${paramName} is incorrectly ordered.')`;

            return `if (!(${paramIsCorrectValue})) ${throwError}`;
        })
        .join('\n');

    const returnStatement =
        paramTuples.length === 0 ? returnTuple.src.valueLiteral : `param0`;

    return `
        ${paramsAreTuples}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramTuples: Candid<Tuple>[],
    returnTuple: Candid<Tuple>
): Test {
    const expectedResult = returnTuple.value;

    return {
        name: `tuple ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/tuple/test');

            const result = await actor[functionName](
                ...paramTuples.map((tuple) => tuple.value)
            );

            // Start by using the equals method defined by the return arbitrary
            // This method works in all cases and if it should return true it
            // will. It's weakness is that we don't always know why it returns
            // false, so if that equals method returns false, then instead of
            // just returning {Ok: false} we will use the equals function that
            // has better reporting of why the test failed but isn't as robust
            if (returnTuple.equals(result, expectedResult)) {
                return { Ok: true };
            }

            return tuplesAreEqual(result, expectedResult);
        }
    };
}

function tuplesAreEqual(
    result: Tuple,
    expectedResult: Tuple
): AzleResult<boolean, string> {
    if (typeof result !== 'object') {
        return { Err: 'Result is not an object' };
    }

    if (typeof expectedResult !== 'object') {
        return { Err: 'Expected result is not an object' };
    }

    const resultFieldsCount = Object.entries(result).length;
    const expectedResultFieldsCount = Object.entries(expectedResult).length;

    if (resultFieldsCount !== expectedResultFieldsCount) {
        return {
            Err: `Result is not of the correct length: expected ${expectedResultFieldsCount}, received ${resultFieldsCount}`
        };
    }

    for (let i = 0; i < expectedResultFieldsCount; i++) {
        const expectedFieldValue = expectedResult[i];
        const actualFieldValue = result[i];

        if (actualFieldValue !== expectedFieldValue) {
            return {
                Err: `Expected result[${i}] to be ${expectedFieldValue} but got ${actualFieldValue} instead`
            };
        }
    }

    return { Ok: true };
}
