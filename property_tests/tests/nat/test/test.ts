import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { NatArb } from '../../../arbitraries/candid/primitive/nats/nat_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllNatsQueryMethod = QueryMethodArb(fc.array(NatArb), NatArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNatsQueryMethod));

function generateBody(
    namedParamNats: Named<CandidMeta<bigint>>[],
    returnNat: CandidMeta<bigint>
): string {
    const paramsAreBigInts = namedParamNats
        .map((param) => {
            return `if (typeof ${param.name} !== 'bigint') throw new Error('${param.name} must be a bigint');`;
        })
        .join('\n');

    const sum = namedParamNats.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnNat.src.valueLiteral);

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamNats);

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreBigInts}

        return ${sum};
    `;
}

function generateTests(
    functionName: string,
    namedParamNats: Named<CandidMeta<bigint>>[],
    returnNat: CandidMeta<bigint>
): Test[] {
    const expectedResult = namedParamNats.reduce(
        (acc, param) => acc + param.el.agentResponseValue,
        returnNat.agentResponseValue
    );
    const paramValues = namedParamNats.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
