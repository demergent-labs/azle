import fc from 'fast-check';
import { QueryMethod } from './canister_methods/query_method_arb';
import { Test } from '../../test';
import { UpdateMethod } from './canister_methods/update_method_arb';
import { InitMethod } from './canister_methods/init_method_arb';
import { PostUpgradeMethod } from './canister_methods/post_upgrade_arb';
import { PreUpgradeMethod } from './canister_methods/pre_upgrade_method_arb';
import { CorrespondingJSType } from './candid/corresponding_js_type';
import { TextClass, FloatClass } from '@dfinity/candid/lib/cjs/idl';

TextClass.prototype.valueToString = (x): string => {
    return `"${escapeForBash(x)}"`;
};

/**
 * If a float doesn't have a decimal it won't serialize properly, so 10 while
 * is a float won't serialize unless it's 10.0
 */
FloatClass.prototype.valueToString = (x): string => {
    const floatString = x.toString();
    if (floatString.includes('.') || floatString.includes('e')) {
        return floatString;
    }
    return floatString + '.0';
};

export type Canister = {
    initArgs: string[] | undefined;
    postUpgradeArgs: string[] | undefined;
    sourceCode: string;
    tests: Test[][];
};

export type CanisterMethod<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue
> =
    | QueryMethod
    | UpdateMethod
    | InitMethod<ParamAgentArgumentValue, ParamAgentResponseValue>
    | PostUpgradeMethod<ParamAgentArgumentValue, ParamAgentResponseValue>
    | PreUpgradeMethod;

export type CanisterConfig<
    ParamAgentArgumentValue extends CorrespondingJSType = undefined,
    ParamAgentResponseValue = undefined
> = {
    globalDeclarations?: string[];
    initMethod?: InitMethod<ParamAgentArgumentValue, ParamAgentResponseValue>;
    postUpgradeMethod?: PostUpgradeMethod<
        ParamAgentArgumentValue,
        ParamAgentResponseValue
    >;
    preUpgradeMethod?: PreUpgradeMethod;
    queryMethods?: QueryMethod[];
    updateMethods?: UpdateMethod[];
};

// TODO: Update the signature to support init, pre/post upgrade, heartbeat, etc.
export function CanisterArb<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue
>(
    configArb: fc.Arbitrary<
        CanisterConfig<ParamAgentArgumentValue, ParamAgentResponseValue>
    >
) {
    return configArb.map((config): Canister => {
        const canisterMethods: CanisterMethod<
            ParamAgentArgumentValue,
            ParamAgentResponseValue
        >[] = [
            ...(config.initMethod ? [config.initMethod] : []),
            ...(config.postUpgradeMethod ? [config.postUpgradeMethod] : []),
            ...(config.preUpgradeMethod ? [config.preUpgradeMethod] : []),
            ...(config.queryMethods ?? []),
            ...(config.updateMethods ?? [])
        ];

        const initArgs = config.initMethod?.params.map((param) => {
            const value = param.value.value;
            return value.runtimeCandidTypeObject
                .getIdl([])
                .valueToString(value.agentArgumentValue);
        });

        const postUpgradeArgs = config.postUpgradeMethod?.params.map(
            (param) => {
                const value = param.value.value;
                return value.runtimeCandidTypeObject
                    .getIdl([])
                    .valueToString(value.agentArgumentValue);
            }
        );

        const sourceCode = generateSourceCode(
            config.globalDeclarations ?? [],
            canisterMethods
        );

        const tests = canisterMethods.reduce(
            (acc: Test[][], canisterMethod): Test[][] => {
                if (canisterMethod.tests.length < acc.length) {
                    return acc.map((accTests, index) => {
                        return [
                            ...accTests,
                            ...(canisterMethod.tests[index] ?? [])
                        ];
                    });
                } else {
                    return canisterMethod.tests.map(
                        (canisterMethodTests, index) => {
                            return [
                                ...(acc[index] ?? []),
                                ...canisterMethodTests
                            ];
                        }
                    );
                }
            },
            []
        );

        return {
            initArgs,
            postUpgradeArgs,
            sourceCode,
            tests
        };
    });
}

function generateSourceCode(
    globalDeclarations: string[],
    canisterMethods: (UpdateMethod | QueryMethod)[]
) {
    const imports = [
        ...new Set([
            'Canister',
            ...canisterMethods.flatMap((method) => [...method.imports])
        ])
    ]
        .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
        .join();

    const declarationsFromCanisterMethods = canisterMethods.flatMap(
        (method) => method.globalDeclarations
    );

    const declarations = [
        ...new Set([...globalDeclarations, ...declarationsFromCanisterMethods])
    ].join('\n');

    const sourceCodes = canisterMethods.map((method) => method.sourceCode);

    return /*TS*/ `
        import { ${imports} } from 'azle';

        // @ts-ignore
        import deepEqual from 'deep-is';

        // #region Declarations
        ${declarations}
        // #endregion Declarations

        export default Canister({
            ${sourceCodes.join(',\n    ')}
        });
    `;
}

function escapeForBash(input: string) {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/'/g, "'\\''") // Escape single quotes
        .replace(/"/g, '\\"'); // Escape double quotes
}
