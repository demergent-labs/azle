import fc from 'fast-check';
import { OptArb } from '../../../arbitraries/candid/constructed/opt_arb';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const OptTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(OptArb))
    .map(([functionName, optRecordArb]) => {
        const opts: OptArb[] = optRecordArb;
        const paramCandidTypes = opts.map((opt) => opt.candidType);
        const paramNames = opts.map((_, index) => `param${index}`);
        // If there are not optTrees then we will be returning None so the type
        // here can be whatever as long as it's wrapped in Opt
        const returnCandidType =
            opts.length === 0 ? 'Opt(int8)' : opts[0].candidType;
        const returnStatement = paramNames[0] ?? `None`;
        const expectedResult = opts.length === 0 ? [] : opts[0].agentValue;

        const candidValues = opts.map((opt) => opt.azleValue);

        const areParamsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (!${createAreOptsEqualCodeUsage(
                    paramName,
                    candidValues[index]
                )}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        const areParamsOpts = paramNames
            .map((paramName) => {
                return `if (!${isParamOpt(
                    paramName
                )}) throw new Error('${paramName} must be an Opt');`;
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
                'float64',
                'text',
                'Null',
                'bool'
            ],
            paramCandidTypes: paramCandidTypes.join(', '),
            returnCandidType,
            paramNames,
            body: `
            ${createAreOptsEqualCodeDeclaration()}
            ${areParamsCorrectlyOrdered}
            ${areParamsOpts}

            return ${returnStatement};
        `,
            test: {
                name: `test opt ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/opt/test');

                    const params = opts.map((opt) => opt.agentValue);

                    const result = await actor[functionName](...params);

                    // TODO be careful on equality checks when we go beyond primitives
                    // TODO a universal equality checker is going to be very useful
                    return {
                        Ok: areOptsEqual(result, expectedResult)
                    };
                }
            }
        };
    });

runPropTests(OptTestArb);

function isParamOpt(paramName: string): string {
    return `(${paramName}.Some !== undefined || ${paramName}.None !== undefined)`;
}

function createAreOptsEqualCodeDeclaration(): string {
    return `
            function calculateDepthAndValues(value: any): {
                depth: number;
                value: any;
            } {
                if (value.None === null) {
                    return { depth: 0, value: null };
                }
                if (value.Some === null || (value.Some.Some === undefined && value.Some.None === undefined)) {
                    // The value.Some is not an opt. return value.Some
                    return {depth: 0, value: JSON.stringify(value.Some, (key, value) => typeof value === 'bigint' ? value.toString() + "n" : value)}
                }

                const result = calculateDepthAndValues(value.Some);
                return { ...result, depth: result.depth + 1 };
            }

            function areOptsEqual(opt1: any, opt2: any) {
                const { depth: depth1, value: value1 } =
                    calculateDepthAndValues(opt1);
                const { depth: depth2, value: value2 } =
                    calculateDepthAndValues(opt2);

                return depth1 === depth2 && value1 === value2;
            }
        `;
}

function createAreOptsEqualCodeUsage(
    paramName: string,
    paramValue: any
): string {
    function replacer(_key: any, value: any) {
        if (typeof value === 'bigint') {
            return value.toString() + 'n';
        }
        return value;
    }

    return `areOptsEqual(${paramName}, ${JSON.stringify(
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

function areOptsEqual(opt1: any, opt2: any) {
    const { depth: depth1, value: value1 } = calculateDepthAndValues(opt1);
    const { depth: depth2, value: value2 } = calculateDepthAndValues(opt2);

    if (depth1 !== depth2) {
        return false;
    }

    function isNone(value: any | []) {
        return Array.isArray(value) && value.length === 0;
    }
    if (isNone(value1) && isNone(value2)) {
        return true;
    }

    return value1 === value2;
}
