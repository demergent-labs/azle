import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import {
    RecordArb,
    Record
} from 'azle/property_tests/arbitraries/candid/constructed/record_arb';
import { QueryMethodBlueprint } from 'azle/property_tests/arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { getActor, runPropTests } from 'azle/property_tests';
import { Test } from 'azle/test';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

const RecordTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        fc.uniqueArray(RecordArb, {
            selector: (entry) => entry.src.candidType
        }),
        RecordArb
    )
    .map(
        ([
            functionName,
            paramRecords,
            defaultReturnRecord
        ]): QueryMethodBlueprint => {
            const imports = new Set([
                ...paramRecords.flatMap((record) => [...record.src.imports]),
                ...defaultReturnRecord.src.imports
            ]);

            const candidTypeDeclarations = [
                ...paramRecords.map(
                    (record) => record.src.typeDeclaration ?? ''
                ),
                defaultReturnRecord.src.typeDeclaration ?? ''
            ];

            const paramNames = paramRecords.map((_, index) => `param${index}`);

            const paramCandidTypes = paramRecords
                .map((record) => record.src.candidType)
                .join(', ');

            const returnRecord =
                paramRecords.length === 0
                    ? defaultReturnRecord
                    : paramRecords[0];
            const returnCandidType = returnRecord.src.candidType;

            const body = generateBody(paramNames, paramRecords, returnRecord);

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
        }
    );

runPropTests(RecordTestArb);

function generateBody(
    paramNames: string[],
    paramRecords: CandidMeta<Record>[],
    returnRecord: CandidMeta<Record>
): string {
    const paramsAreRecords = paramRecords
        .map((record, index) => {
            const paramName = paramNames[index];
            const fieldsCount = Object.keys(record.agentArgumentValue).length;

            const paramIsObject = `typeof ${paramName} === 'object'`;
            const paramHasCorrectNumberOfFields = `Object.keys(${paramName}).length === ${fieldsCount}`;
            const throwError = `throw new Error('${paramName} must be a Record');`;

            return `if (!(${paramIsObject} && ${paramHasCorrectNumberOfFields})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramRecords
    );

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
                ...paramRecords.map((record) => record.agentArgumentValue)
            );

            return { Ok: deepEqual(result, returnRecord.agentResponseValue) };
        }
    };
}
