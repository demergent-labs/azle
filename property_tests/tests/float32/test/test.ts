import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Float32Arb } from '../../../arbitraries/candid/primitive/floats/float32_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllFloat32sQueryMethod = QueryMethodArb(
    fc.array(Float32Arb),
    Float32Arb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(AllFloat32sQueryMethod));

function generateBody(
    namedParamFloat32s: Named<CandidMeta<number>>[],
    returnFloat32: CandidMeta<number>
): string {
    const paramsAreNumbers = namedParamFloat32s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered =
        areParamsCorrectlyOrdered(namedParamFloat32s);

    const returnStatement =
        namedParamFloat32s.length === 0
            ? returnFloat32.src.valueLiteral
            : namedParamFloat32s[0].name;

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreNumbers}

        return ${returnStatement};
    `;
}

function generateTests(
    functionName: string,
    namedParamFloat32s: Named<CandidMeta<number>>[],
    returnFloat32: CandidMeta<number>
): Test[] {
    const expectedResult =
        namedParamFloat32s.length === 0
            ? returnFloat32.agentResponseValue
            : namedParamFloat32s[0].el.agentResponseValue;
    const paramValues = namedParamFloat32s.map(
        (paramFloats) => paramFloats.el.agentArgumentValue
    );
    return [
        {
            name: `float32 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/float32/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
