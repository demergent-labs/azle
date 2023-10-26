import fc from 'fast-check';
import { Nat64Arb } from '../../../arbitraries/candid/primitive/nats/nat64_arb';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../../';

const Nat64TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Nat64Arb))
    .map(([functionName, nat64s]) => {
        const paramCandidTypes = nat64s
            .map((nat64) => nat64.candidType)
            .join(', ');
        const returnCandidType = 'nat64';
        const paramNames = nat64s.map((_, index) => `param${index}`);

        const paramsAreBigInts = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0n');

        const length = nat64s.length === 0 ? 1 : nat64s.length;

        const returnStatement = `(${paramsSum}) / ${length}n`;

        const expectedResult =
            nat64s.reduce((acc, nat64) => acc + nat64.value, 0n) /
            BigInt(length);

        const paramSamples = nat64s;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramSamples[index]}n) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['nat64'],
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
                    const actor = getActor('./tests/nat64/test');

                    const result = await actor[functionName](...nat64s);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Nat64TestArb);
