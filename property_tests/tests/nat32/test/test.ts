import fc from 'fast-check';
import { Nat32Arb } from '../../../arbitraries/candid/primitive/nats/nat32_arb';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const Nat32TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Nat32Arb))
    .map(([functionName, nat32s]) => {
        const paramCandidTypes = nat32s.map(() => 'nat32').join(', ');
        const returnCandidType = 'nat32';
        const paramNames = nat32s.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0');

        const length = nat32s.length === 0 ? 1 : nat32s.length;

        const returnStatement = `Math.floor((${paramsSum}) / ${length})`;

        const expectedResult = Math.floor(
            nat32s.reduce((acc, nat32) => acc + nat32, 0) / length
        );

        const paramSamples = nat32s;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramSamples[index]}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['nat32'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            paramSamples,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreNumbers}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/nat32/test');

                    const result = await actor[functionName](...nat32s);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Nat32TestArb);
