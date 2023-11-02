import fc from 'fast-check';

import {
    RecordArb,
    Record
} from '../../../arbitraries/candid/constructed/record_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { getActor, runPropTests } from '../../..';
import { AzleResult, Test } from '../../../../test';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';

const RecordTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        fc.uniqueArray(RecordArb, {
            selector: (entry) => entry.src.candidType
        }),
        RecordArb
    )
    .map(([functionName, paramRecords, defaultReturnRecord]): TestSample => {
        const imports = new Set([
            ...paramRecords.flatMap((record) => [...record.src.imports]),
            ...defaultReturnRecord.src.imports
        ]);

        const candidTypeDeclarations = [
            ...paramRecords.map((record) => record.src.typeDeclaration ?? ''),
            defaultReturnRecord.src.typeDeclaration ?? ''
        ];

        const paramNames = paramRecords.map((_, index) => `param${index}`);

        const paramCandidTypes = paramRecords
            .map((record) => record.src.candidType)
            .join(', ');

        const returnRecord =
            paramRecords.length === 0 ? defaultReturnRecord : paramRecords[0];
        const returnCandidType = returnRecord.src.candidType;

        const body = generateBody(paramRecords, returnRecord);

        const test = generateTest(functionName, paramRecords, returnRecord);

        return {
            imports,
            candidTypeDeclarations,
            functionName,
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            test
        };
    });

runPropTests(RecordTestArb);

function generateBody(
    paramRecords: CandidMeta<Record>[],
    returnRecord: CandidMeta<Record>
): string {
    const paramsAreRecords = paramRecords
        .map((record, index) => {
            const paramName = `param${index}`;
            const fieldsCount = Object.keys(record.value).length;

            const paramIsObject = `typeof ${paramName} === 'object'`;
            const paramHasCorrectNumberOfFields = `Object.keys(${paramName}).length === ${fieldsCount}`;
            const throwError = `throw new Error('${paramName} must be a Record');`;

            return `if (!(${paramIsObject} && ${paramHasCorrectNumberOfFields})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = paramRecords
        .map((record, index) => {
            const paramName = `param${index}`;

            const fieldNamesMatch = Object.entries(record.value)
                .map(([fieldName, _]) => {
                    return `Object.keys(${paramName}).includes('${fieldName}')`;
                })
                .join(' && ');

            const throwError = `throw new Error('${paramName} is incorrectly ordered')`;

            if (Object.entries(record.value).length === 0) {
                return `if (Object.keys(${paramName}).length !== 0) ${throwError}`;
            }

            return `if (!(${fieldNamesMatch})) ${throwError}`;
        })
        .join('\n');

    const returnStatement =
        paramRecords.length === 0 ? returnRecord.src.valueLiteral : `param0`;

    return `
        ${paramsAreRecords}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramRecords: CandidMeta<Record>[],
    returnRecord: CandidMeta<Record>
): Test {
    return {
        name: `record ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/record/test');

            const result = await actor[functionName](
                ...paramRecords.map((record) => record.value)
            );

            // Start by using the equals method defined by the return arbitrary
            // This method works in all cases and if it should return true it
            // will. It's weakness is that we don't always know why it returns
            // false, so if that equals method returns false, then instead of
            // just returning {Ok: false} we will use the equals function that
            // has better reporting of why the test failed but isn't as robust
            if (returnRecord.equals(result, returnRecord.value)) {
                return { Ok: true };
            }
            return recordsAreEqual(result, returnRecord.value);
        }
    };
}

function recordsAreEqual(
    result: Record,
    expectedResult: Record
): AzleResult<boolean, string> {
    if (typeof result !== 'object') {
        return { Err: 'Result is not an object' };
    }

    if (typeof expectedResult !== 'object') {
        return { Err: 'Expected Result is not an object' };
    }

    const resultKeys = Object.keys(result);
    const resultEntries = Object.entries(result);
    const expectedResultEntries = Object.entries(expectedResult);

    if (resultEntries.length !== expectedResultEntries.length) {
        return {
            Err: `The entries of result and expectedResult differ in length: ${resultEntries.length} & ${expectedResultEntries.length} respectively`
        };
    }

    for (let i = 0; i < expectedResultEntries.length; i++) {
        const [expectedResultKey, expectedResultValue] =
            expectedResultEntries[i];

        if (!resultKeys.includes(expectedResultKey)) {
            return {
                Err: `Result is missing key "${expectedResultKey}"`
            };
        }

        if (result[expectedResultKey] !== expectedResultValue) {
            return {
                Err: `Expected result.${expectedResultKey} to be ${expectedResultValue} but got ${result[expectedResultKey]} instead`
            };
        }
    }

    return { Ok: true };
}
