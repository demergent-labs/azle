import fc from 'fast-check';
import {
    OptArb,
    OptRecordArb
} from '../../../arbitraries/candid/constructed/opt_arb';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const NewOptTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(OptRecordArb))
    .map(([functionName, optTrees]) => {
        const paramCandidTypes = optTrees.map((tree) => createCandidType(tree));
        const returnCandidType =
            optTrees.length === 0 ? 'Opt(int8)' : createCandidType(optTrees[0]);
        const paramNames = optTrees.map((_, index) => `param${index}`);
        const returnStatement = paramNames[0] ?? `None`;
        const expectedResult =
            optTrees.length === 0 ? [] : createAgentValue(optTrees[0]);

        const candidValues = optTrees.map((tree) => createCandidValue(tree));

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                const areOptEqual = areOptsEqual(
                    paramName,
                    candidValues[index]
                );
                return `if (!${areOptEqual}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

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
                'Opt',
                'float32',
                'text',
                'Null',
                'bool'
            ],
            paramCandidTypes: paramCandidTypes.join(', '),
            returnCandidType,
            paramNames,
            body: `
            function calculateDepthAndValues(value: any): {
                depth: number;
                value: any;
            } {
                if (value.None === null) {
                    console.log("We found the value to be None")
                    return { depth: 0, value: null };
                }
                if (value.Some.Some === undefined && value.Some.None === undefined) {
                    // The value.Some is not an opt. return value.Some
                    console.log("We found the value to be some")
                    return {depth: 0, value: JSON.stringify(value.Some, (key, value) => typeof value === 'bigint' ? value.toString() + "n" : value)}
                }

                const result = calculateDepthAndValues(value.Some);
                return { ...result, depth: result.depth + 1 };
            }

            function compareDepthsAndValues(value1: any, value2: any) {
                const { depth: depth1, value: deepestValue1 } =
                    calculateDepthAndValues(value1);
                const { depth: depth2, value: deepestValue2 } =
                    calculateDepthAndValues(value2);

                return depth1 === depth2 && deepestValue1 === deepestValue2;
            }

            ${paramsCorrectlyOrdered}


            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/opt/test');

                    const params = optTrees.map((tree) =>
                        createAgentValue(tree)
                    );

                    const result = await actor[functionName](...params);

                    // TODO be careful on equality checks when we go beyond primitives
                    // TODO a universal equality checker is going to be very useful
                    return {
                        Ok: compareDepthsAndValues(result, expectedResult)
                    };
                }
            }
        };
    });

function createCandidType(optTree: any): string {
    if (optTree.nextLayer === null) {
        // base case
        return `Opt(${optTree.base.candidType})`;
    } else {
        return `Opt(${createCandidType(optTree.nextLayer)})`;
    }
}

function createAgentValue(optTree: any): any {
    if (optTree.nextLayer === null) {
        // base case
        if (optTree.base.opt && optTree.base.opt.Some !== undefined) {
            return [optTree.base.opt.Some];
        } else {
            return [];
        }
    } else {
        return [createAgentValue(optTree.nextLayer)];
    }
}

function createCandidValue(optTree: any): any {
    if (optTree.nextLayer === null) {
        // base case
        if (optTree.base.opt && optTree.base.opt.Some !== undefined) {
            return { Some: optTree.base.opt.Some };
        } else {
            return { None: null };
        }
    } else {
        return { Some: createCandidValue(optTree.nextLayer) };
    }
}

runPropTests(NewOptTestArb);

// const OptTestArb = fc
//     .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(OptArb))
//     .map(([functionName, optWrappers]) => {
//         const paramCandidTypes = optWrappers.map(
//             (vecWrapper) => vecWrapper.candidType
//         );
//         const returnCandidType = optWrappers[0]?.candidType ?? 'Opt(int8)';
//         const paramNames = optWrappers.map((_, index) => `param${index}`);

//         // TODO this ordering check is not perfect
//         // TODO but turning the vec into a string seems a bit difficult...we need to figure out how to check perfecly for the values that we want
//         // TODO maybe a global variable that we can write into and call would work
//         // TODO we really need to create some kind of universal equality checking solution
//         const paramsCorrectlyOrdered = paramNames
//             .map((paramName, index) => {
//                 return `if (${paramName}.Some === undefined && ${optWrappers[index].opt.Some} === undefined && ${paramName}.None !== ${optWrappers[index].opt.None}) throw new Error('${paramName} is incorrectly ordered')`;
//             })
//             .join('\n');

//         // TODO these checks should be much more precise probably, imagine checking the values inside of the opts
//         const paramsOpts = paramNames
//             .map((paramName) => {
//                 return `if (${paramName}.Some === undefined && ${paramName}.None === undefined) throw new Error('${paramName} must be an Opt');`;
//             })
//             .join('\n');

//         const returnStatement = paramNames[0] ?? `None`;

//         const expectedResult =
//             optWrappers.length === 0 ? [] : unwrapAllOpts(optWrappers)[0];

//         return {
//             functionName,
//             imports: [
//                 'int',
//                 'int8',
//                 'int16',
//                 'int32',
//                 'int64',
//                 'nat',
//                 'nat8',
//                 'nat16',
//                 'nat32',
//                 'nat64',
//                 'None',
//                 'Opt'
//             ],
//             paramCandidTypes: paramCandidTypes.join(', '),
//             returnCandidType,
//             paramNames,
//             body: `
//             ${paramsOpts}

//             return ${returnStatement};
//         `,
//             test: {
//                 name: `test ${functionName}`,
//                 test: async () => {
//                     const actor = getActor('./tests/opt/test');

//                     const params = unwrapAllOpts(optWrappers);

//                     const result = await actor[functionName](...params);

//                     if (result.length === 1 && Array.isArray(result[0])) {
//                         console.log(JSON.stringify(params, replacer));

//                         console.log("WE'VE GOT A LIVE ONE");
//                         console.log('result', result);
//                         console.log('expected result', expectedResult);
//                         console.log(
//                             compareDepthsAndValues(result, expectedResult)
//                         );
//                     }

//                     // TODO be careful on equality checks when we go beyond primitives
//                     // TODO a universal equality checker is going to be very useful
//                     return {
//                         Ok: compareDepthsAndValues(result, expectedResult)
//                     };
//                 }
//             }
//         };
//     });

// runPropTests(OptTestArb);

function replacer(_key: any, value: any) {
    if (typeof value === 'bigint') {
        return value.toString() + 'n';
    }
    return value;
}

function areOptsEqual(paramName: string, paramValue: any) {
    return `compareDepthsAndValues(${paramName}, ${JSON.stringify(
        paramValue,
        replacer
    )})`;
}

function calculateDepthAndValues(value: [any] | []): {
    depth: number;
    value: any;
} {
    if (value.length === 0) {
        // None
        return { depth: 1, value: value };
    }
    const isOpt =
        Array.isArray(value[0]) &&
        (value[0].length === 1 || value[0].length === 0);
    if (!isOpt) {
        // The value.Some is not an opt. return value.Some
        return {
            depth: 1,
            value: value[0]
        };
    }

    const result = calculateDepthAndValues(value[0]);
    return { ...result, depth: result.depth + 1 };
}

function compareDepthsAndValues(value1: any, value2: any) {
    const { depth: depth1, value: deepestValue1 } =
        calculateDepthAndValues(value1);
    const { depth: depth2, value: deepestValue2 } =
        calculateDepthAndValues(value2);

    return depth1 === depth2 && optEquals(deepestValue1, deepestValue2);
}

function optEquals(value1: any | [], value2: any | []) {
    function isNone(value: any | []) {
        return Array.isArray(value) && value.length === 0;
    }
    if (isNone(value1) && isNone(value2)) {
        return true;
    }
    return value1 === value2;
}
