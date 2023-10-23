import fc from 'fast-check';
import { Nat16Arb } from '../../../arbitraries/candid/primitive/nats/nat16_arb';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const Nat16TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Nat16Arb))
    .map(([functionName, nat16s]) => {
        const paramCandidTypes = nat16s.map(() => 'nat16').join(', ');
        const returnCandidType = 'nat16';
        const paramNames = nat16s.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0');

        const length = nat16s.length === 0 ? 1 : nat16s.length;

        const returnStatement = `Math.floor((${paramsSum}) / ${length})`;

        const expectedResult = Math.floor(
            nat16s.reduce((acc, nat16) => acc + nat16, 0) / length
        );

        const paramSamples = nat16s;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramSamples[index]}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['nat16'],
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
                    const actor = getActor('./tests/nat16/test');

                    const result = await actor[functionName](...nat16s);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Nat16TestArb);
