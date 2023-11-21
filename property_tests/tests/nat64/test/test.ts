import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Nat64Arb } from '../../../arbitraries/candid/primitive/nats/nat64_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllNat64sQueryMethod = QueryMethodArb(fc.array(Nat64Arb), Nat64Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNat64sQueryMethod));

function generateBody(
    namedParamNat64s: Named<CandidMeta<bigint>>[],
    returnNat64: CandidMeta<bigint>
): string {
    const paramsAreBigInts = namedParamNat64s
        .map((param) => {
            return `if (typeof ${param.name} !== 'bigint') throw new Error('${param.name} must be a bigint');`;
        })
        .join('\n');

    const sum = namedParamNat64s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnNat64.src.valueLiteral);
    const count = namedParamNat64s.length + 1;
    const average = `(${sum}) / ${count}n`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamNat64s);

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamNat64s: Named<CandidMeta<bigint>>[],
    returnNat64: CandidMeta<bigint>
): Test[] {
    const count = namedParamNat64s.length + 1;
    const expectedResult =
        namedParamNat64s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnNat64.agentResponseValue
        ) / BigInt(count);
    const paramValues = namedParamNat64s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat64 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat64/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
