import fc from 'fast-check';
import { OptArb } from '../../../arbitraries/candid/constructed/opt_arb';
import { getCanisterId } from '../../../../test';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const OptTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(OptArb))
    .map(([functionName, optWrappers]) => {
        const paramCandidTypes = optWrappers.map(
            (vecWrapper) => vecWrapper.candidType
        );
        const returnCandidType = optWrappers[0]?.candidType ?? 'Opt(int8)';
        const paramNames = optWrappers.map((_, index) => `param${index}`);

        // TODO this ordering check is not perfect
        // TODO but turning the vec into a string seems a bit difficult...we need to figure out how to check perfecly for the values that we want
        // TODO maybe a global variable that we can write into and call would work
        // TODO we really need to create some kind of universal equality checking solution
        // const paramsCorrectlyOrdered = paramNames
        //     .map((paramName, index) => {
        //         return `if (${paramName}.Some === undefined && ${optWrappers[index].opt.Some} === undefined && ${paramName}.None !== ${optWrappers[index].opt.None}) throw new Error('${paramName} is incorrectly ordered')`;
        //     })
        //     .join('\n');

        // TODO these checks should be much more precise probably, imagine checking the values inside of the opts
        const paramsOpts = paramNames
            .map((paramName) => {
                return `if (${paramName}.Some === undefined && ${paramName}.None === undefined) throw new Error('${paramName} must be an Opt');`;
            })
            .join('\n');

        const returnStatement = paramNames[0] ?? `None`;

        const expectedResult =
            optWrappers[0]?.opt.Some !== undefined
                ? [optWrappers[0]?.opt.Some]
                : [];

        return {
            functionName,
            imports: [
                'int',
                'int8',
                'int16',
                'int32',
                'int64',
                'nat',
                'nat8',
                'nat16',
                'nat32',
                'nat64',
                'None',
                'Opt'
            ],
            paramCandidTypes: paramCandidTypes.join(', '),
            returnCandidType,
            paramNames,
            body: `
            ${paramsOpts}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const resolvedPathIndex = require.resolve(
                        `./dfx_generated/canister/index.js`
                    );
                    const resolvedPathDid = require.resolve(
                        `./dfx_generated/canister/canister.did.js`
                    );

                    delete require.cache[resolvedPathIndex];
                    delete require.cache[resolvedPathDid];

                    const { createActor } = require(`./dfx_generated/canister`);

                    const actor: any = createActor(getCanisterId('canister'), {
                        agentOptions: {
                            host: 'http://127.0.0.1:8000'
                        }
                    });

                    const result = await actor[functionName](
                        ...optWrappers.map((optWrapper) => {
                            if (optWrapper.opt.Some !== undefined) {
                                return [optWrapper.opt.Some];
                            } else {
                                return [];
                            }
                        })
                    );

                    // TODO be careful on equality checks when we go beyond primitives
                    // TODO a universal equality checker is going to be very useful
                    return {
                        Ok:
                            result.length === expectedResult.length &&
                            result[0] === expectedResult[0]
                    };
                }
            }
        };
    });

runPropTests(OptTestArb);
