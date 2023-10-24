import fc from 'fast-check';
import { OptArb } from '../../../arbitraries/candid/constructed/opt_arb';
import { getActor } from '../../../get_actor';
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
            optWrappers.length === 0 ? [] : unwrapAllOpts(optWrappers)[0];

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
                    const actor = getActor('./tests/opt/test');

                    const params = unwrapAllOpts(optWrappers);

                    const result = await actor[functionName](...params);

                    if (result.length === 1 && Array.isArray(result[0])) {
                        console.log(JSON.stringify(params, replacer));

                        console.log("WE'VE GOT A LIVE ONE");
                        console.log('result', result);
                        console.log('expected result', expectedResult);
                        console.log(
                            compareDepthsAndValues(result, expectedResult)
                        );
                    }

                    // TODO be careful on equality checks when we go beyond primitives
                    // TODO a universal equality checker is going to be very useful
                    return {
                        Ok: compareDepthsAndValues(result, expectedResult)
                    };
                }
            }
        };
    });

runPropTests(OptTestArb);

type OptWrapper = { opt: any; candidType: string };

function unwrapAllOpts(optWrappers: OptWrapper[]): any[] {
    return optWrappers.map((optWrapper) => unwrapOpt(optWrapper));
}

function unwrapOpt(optWrapper: OptWrapper): any {
    if (optWrapper.opt && optWrapper.opt.Some !== undefined) {
        if (optWrapper.opt.Some.candidType !== undefined) {
            return [unwrapOpt(optWrapper.opt)];
        }
        return [optWrapper.opt.Some];
    } else {
        return [];
    }
}

function replacer(key: any, value: any) {
    if (typeof value === 'bigint') {
        return value.toString();
    }
    return value;
}

function calculateDepthAndValues(value: any): { depth: number; value: any } {
    if (!Array.isArray(value)) {
        return { depth: 0, value: value };
    }

    let maxDepth = 0;
    let deepestValue;

    for (const item of value) {
        if (Array.isArray(item)) {
            const { depth, value } = calculateDepthAndValues(item);
            if (depth > maxDepth) {
                maxDepth = depth;
                deepestValue = value;
            }
        } else {
            if (typeof item !== 'undefined') {
                deepestValue = item;
            }
        }
    }

    if (maxDepth > 2) {
        console.log('THIS ONE IS EXCITING');
    }

    return { depth: 1 + maxDepth, value: deepestValue };
}

function compareDepthsAndValues(value1: any, value2: any) {
    const { depth: depth1, value: deepestValue1 } =
        calculateDepthAndValues(value1);
    const { depth: depth2, value: deepestValue2 } =
        calculateDepthAndValues(value2);

    return depth1 === depth2 && deepestValue1 === deepestValue2;
}
