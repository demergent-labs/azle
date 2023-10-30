import fc from 'fast-check';

import {
    RecordArb,
    Record
} from '../../../arbitraries/candid/constructed/record_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { getActor, runPropTests } from '../../..';
import { AzleResult, Test } from '../../../../test';
import { Candid } from '../../../arbitraries/candid';

const RecordTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        fc.uniqueArray(RecordArb, {
            selector: (entry) => entry.src.candidType
        })
    )
    .map(([functionName, records]): TestSample => {
        const imports = Array.from(
            records.reduce((acc, record) => {
                return new Set([...acc, ...record.src.imports]);
            }, new Set<string>())
        );

        const candidTypeDeclarations = records.map(
            (record) => record.src.typeDeclaration ?? ''
        );

        const paramNames = records.map((_, index) => `param${index}`);

        const paramCandidTypes = records
            .map((record) => record.src.candidType)
            .join(', ');

        const returnCandidType = records[0]?.src?.candidType ?? 'Record({})';

        const body = generateBody(records);

        const test = generateTest(functionName, records);

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

runPropTests(RecordTestArb);

function generateBody(records: Candid<Record>[]): string {
    const paramsAreRecords = records
        .map((record, index) => {
            const paramName = `param${index}`;
            const fieldsCount = Object.keys(record.value).length;

            const paramIsObject = `typeof ${paramName} === 'object'`;
            const paramHasCorrectNumberOfFields = `Object.keys(${paramName}).length === ${fieldsCount}`;
            const throwError = `throw new Error('${paramName} must be a Record');`;

            return `if (!(${paramIsObject} && ${paramHasCorrectNumberOfFields})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = records
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

    const returnStatement = records.length === 0 ? '{}' : `param0`;

    return `
        ${paramsAreRecords}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(functionName: string, records: Candid<Record>[]): Test {
    const expectedResult = records[0]?.value ?? {};

    return {
        name: `record ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/record/test');

            const result = await actor[functionName](
                ...records.map((record) => record.value)
            );

            return recordsAreEqual(result, expectedResult);
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
