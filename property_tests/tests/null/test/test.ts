import fc from 'fast-check';
import { getCanisterId } from '../../../../test';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';
import { NullArb } from '../../../arbitraries/candid/primitive/null';

const NullTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(NullArb))
    .map(([functionName, nulls]) => {
        const paramCandidTypes = nulls.map(() => 'Null').join(', ');
        const returnCandidType = 'Null';
        const paramNames = nulls.map((_, index) => `param${index}`);

        const areAllNull = paramNames.reduce((acc, paramName) => {
            return `${acc} && ${paramName} === null`;
        }, 'true');

        const allNullCheck = `if (!(${areAllNull})) throw new Error("Not all of the values were null")`;

        return {
            functionName,
            imports: ['Null'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            paramSamples: nulls,
            body: `
            ${allNullCheck}

            return null;
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const { createActor } = await import(
                        `./dfx_generated/canister`
                    );

                    const actor: any = createActor(getCanisterId('canister'), {
                        agentOptions: {
                            host: 'http://127.0.0.1:8000'
                        }
                    });

                    const result = await actor[functionName](...nulls);

                    return {
                        Ok: result === null
                    };
                }
            }
        };
    });

runPropTests(NullTestArb);
