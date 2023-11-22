import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import {
    TupleArb,
    Tuple,
    ReturnTuple
} from 'azle/property_tests/arbitraries/candid/constructed/tuple_arb';
import { QueryMethodBlueprint } from 'azle/property_tests/arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from 'azle/property_tests/arbitraries/unique_identifier_arb';
import { getActor, runPropTests } from 'azle/property_tests';
import { Test } from 'azle/test';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

const TupleTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        fc.uniqueArray(TupleArb, {
            selector: (entry) => entry.src.candidType
        }),
        TupleArb
    )
    .map(
        ([
            functionName,
            paramTuples,
            defaultReturnTuple
        ]): QueryMethodBlueprint => {
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

            const body = generateBody(paramNames, paramTuples, returnTuple);

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
        }
    );

runPropTests(TupleTestArb);

function generateBody(
    paramNames: string[],
    paramTuples: CandidMeta<Tuple, ReturnTuple>[],
    returnTuple: CandidMeta<Tuple, ReturnTuple>
): string {
    const paramsAreTuples = paramTuples
        .map((tuple, index) => {
            const paramName = paramNames[index];
            const fieldsCount = tuple.agentArgumentValue.length;

            const paramIsArray = `Array.isArray(${paramName})`;
            const paramHasCorrectNumberOfFields = `${paramName}.length === ${fieldsCount}`;
            const throwError = `throw new Error('${paramName} must be a Tuple');`;

            return `if (!(${paramIsArray} && ${paramHasCorrectNumberOfFields})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramTuples
    );

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
    paramTuples: CandidMeta<Tuple, ReturnTuple>[],
    returnTuple: CandidMeta<Tuple, ReturnTuple>
): Test {
    const expectedResult = returnTuple.agentResponseValue;

    return {
        name: `tuple ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/tuple/test');

            const result = await actor[functionName](
                ...paramTuples.map((tuple) => tuple.agentArgumentValue)
            );

            return { Ok: deepEqual(result, expectedResult) };
        }
    };
}
