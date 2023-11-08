import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { getActor, runPropTests } from '../../..';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { FuncArb, Func } from '../../../arbitraries/candid/reference/func_arb';
import { QueryMethodBlueprint } from '../../../arbitraries/test_sample_arb';
import { UniqueIdentifierArb } from '../../../arbitraries/unique_identifier_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const FuncTestArb = fc
    .tuple(
        UniqueIdentifierArb('canisterMethod'),
        // TODO: Consider making this not a unique array and then dealing with
        // duplicates when making the type declarations
        fc.uniqueArray(FuncArb, {
            selector: (entry) => entry.src.candidType
        }),
        FuncArb
    )
    .map(
        ([
            functionName,
            paramFuncs,
            defaultReturnFunc
        ]): QueryMethodBlueprint => {
            const imports = new Set([
                'Principal',
                'Void',
                ...paramFuncs.flatMap((func) => [...func.src.imports]),
                ...defaultReturnFunc.src.imports
            ]);

            const candidTypeDeclarations = [
                ...paramFuncs.map((func) => func.src.typeDeclaration ?? ''),
                paramFuncs.length === 0
                    ? defaultReturnFunc.src.typeDeclaration ?? ''
                    : ''
            ];

            const paramNames = paramFuncs.map((_, index) => `param${index}`);

            const paramCandidTypes = paramFuncs
                .map((func) => func.src.candidType)
                .join(', ');

            const returnFunc =
                paramFuncs.length === 0 ? defaultReturnFunc : paramFuncs[0];

            const returnCandidType = returnFunc.src.candidType;

            const body = generateBody(paramNames, paramFuncs, returnFunc);

            const tests = [generateTest(functionName, paramFuncs, returnFunc)];

            return {
                functionName,
                imports,
                candidTypeDeclarations,
                paramNames,
                paramCandidTypes,
                returnCandidType,
                body,
                tests
            };
        }
    );

runPropTests(CanisterArb(FuncTestArb));

function generateBody(
    paramNames: string[],
    paramFuncs: CandidMeta<Func>[],
    returnFunc: CandidMeta<Func>
): string {
    const paramsAreFuncs = paramFuncs
        .map((_, index) => {
            const paramName = paramNames[index];

            const paramIsArray = `Array.isArray(${paramName})`;
            const paramHas2Fields = `${paramName}.length === 2`;
            const field0IsAPrincipal = `${paramName}[0]._isPrincipal === true`;
            const field1IsAString = `typeof ${paramName}[1] === 'string'`;

            const paramIsAFunc = [
                paramIsArray,
                paramHas2Fields,
                field0IsAPrincipal,
                field1IsAString
            ].join(' && ');

            const throwError = `throw new Error('${paramName} must be a Func');`;

            return `if (!(${paramIsAFunc})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramFuncs
    );

    const returnStatement =
        paramFuncs.length === 0 ? returnFunc.src.valueLiteral : `param0`;

    return `
        ${paramsAreFuncs}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    funcs: CandidMeta<Func>[],
    returnFunc: CandidMeta<Func>
): Test {
    return {
        name: `func ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/func/test');

            const result = await actor[functionName](
                ...funcs.map((func) => func.value)
            );

            return {
                Ok: deepEqual(result, returnFunc.value)
            };
        }
    };
}
