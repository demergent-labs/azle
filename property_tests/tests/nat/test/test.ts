import fc from 'fast-check';
import { NatArb } from '../../../arbitraries/candid/primitive/nats/nat_arb';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../../';

const NatTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(NatArb))
    .map(([functionName, nats]) => {
        const paramCandidTypes = nats.map(() => 'nat').join(', ');
        const returnCandidType = 'nat';
        const paramNames = nats.map((_, index) => `param${index}`);

        const paramsAreBigInts = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0n');

        const returnStatement = `${paramsSum}`;

        const expectedResult = nats.reduce((acc, nat) => acc + nat, 0n);

        const paramSamples = nats;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramSamples[index]}n) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['nat'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            paramSamples,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreBigInts}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/nat/test');

                    const result = await actor[functionName](...nats);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(NatTestArb);
