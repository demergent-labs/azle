import fc from 'fast-check';
import { createUniquePrimitiveArb } from './unique_primitive_arb';
import { JsFunctionNameArb } from './js_function_name_arb';
import { getCanisterId } from '../../test';
import { NatArb } from './candid/primitive/nats/nat_arb';

export function createQueryMethodArb(testName: string) {
    return fc
        .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(NatArb))
        .map(([jsFunctionName, nats]) => {
            const paramCandidTypes = nats.map(() => 'nat').join(', ');
            const paramNames = nats.map((_, index) => `param${index}`);

            const paramsCorrectlyOrdered = paramNames
                .map((paramName, index) => {
                    return `if (${paramName} !== ${nats[index]}n) throw new Error('${paramName} is incorrectly ordered')`;
                })
                .join('\n');

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

            return {
                name: jsFunctionName,
                sourceCode: `${jsFunctionName}: query([${paramCandidTypes}], nat, (${paramNames.join(
                    ', '
                )}) => {
                    ${paramsCorrectlyOrdered}

                    ${paramsAreBigInts}

                    return ${returnStatement};
                })`,
                test: {
                    name: `query method test ${jsFunctionName}`,
                    test: async () => {
                        const { createActor } = await import(
                            `../tests/${testName}/test/dfx_generated/canister`
                        );

                        const actor: any = createActor(
                            getCanisterId('canister'),
                            {
                                agentOptions: {
                                    host: 'http://127.0.0.1:8000'
                                }
                            }
                        );

                        const result = await actor[jsFunctionName](...nats);

                        return {
                            Ok: result === expectedResult
                        };
                    }
                }
            };
        });
}
