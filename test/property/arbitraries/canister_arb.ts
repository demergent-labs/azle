import fc from 'fast-check';

import { Test } from '../test';
import { CliStringVisitor } from '../visitors/cli-string-visitor';
import { CorrespondingJSType } from './candid/corresponding_js_type';
import { InitMethod } from './canister_methods/init_method_arb';
import { InspectMessageMethod } from './canister_methods/inspect_message_method_arb';
import { PostUpgradeMethod } from './canister_methods/post_upgrade_arb';
import { PreUpgradeMethod } from './canister_methods/pre_upgrade_method_arb';
import { QueryMethod } from './canister_methods/query_method_arb';
import { UpdateMethod } from './canister_methods/update_method_arb';
import { Context } from './types';

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
    | PreUpgradeMethod
    | InspectMessageMethod;

export type CanisterConfig<
    ParamAgentArgumentValue extends CorrespondingJSType = undefined,
    ParamAgentResponseValue = undefined
> = {
    globalDeclarations?: string[];
    initMethod?: InitMethod<ParamAgentArgumentValue, ParamAgentResponseValue>;
    inspectMessageMethod?: InspectMessageMethod;
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
    context: Context,
    configArb: fc.Arbitrary<
        CanisterConfig<ParamAgentArgumentValue, ParamAgentResponseValue>
    >
): fc.Arbitrary<Canister> {
    return configArb.map((config): Canister => {
        const canisterMethods: CanisterMethod<
            ParamAgentArgumentValue,
            ParamAgentResponseValue
        >[] = [
            ...(config.initMethod ? [config.initMethod] : []),
            ...(config.inspectMessageMethod
                ? [config.inspectMessageMethod]
                : []),
            ...(config.postUpgradeMethod ? [config.postUpgradeMethod] : []),
            ...(config.preUpgradeMethod ? [config.preUpgradeMethod] : []),
            ...(config.queryMethods ?? []),
            ...(config.updateMethods ?? [])
        ];

        const initArgs = config.initMethod?.params.map((param) => {
            const value = param.value.value;
            return value.runtimeTypeObject
                .getIdlType([])
                .accept(new CliStringVisitor(), {
                    value: value.agentArgumentValue
                });
        });

        const postUpgradeArgs = config.postUpgradeMethod?.params.map(
            (param) => {
                const value = param.value.value;
                return value.runtimeTypeObject
                    .getIdlType([])
                    .accept(new CliStringVisitor(), {
                        value: value.agentArgumentValue
                    });
            }
        );

        const sourceCode = generateSourceCode(
            config.globalDeclarations ?? [],
            canisterMethods,
            context.api
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
    canisterMethods: (UpdateMethod | QueryMethod)[],
    api: 'class' | 'functional'
): string {
    const canisterImports = api === 'functional' ? ['Canister'] : [];
    const imports = [
        ...new Set([
            ...canisterImports,
            ...canisterMethods.flatMap((method) => [...method.imports])
        ])
    ]
        .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
        .join();
    const importLocation = `azle${api === 'functional' ? '/experimental' : ''}`;

    const declarationsFromCanisterMethods = canisterMethods.flatMap(
        (method) => method.globalDeclarations
    );

    const declarations = [
        ...new Set([...globalDeclarations, ...declarationsFromCanisterMethods])
    ].join('\n');

    const sourceCodes = canisterMethods.map((method) => method.sourceCode);

    const canister =
        api === 'functional'
            ? `
        export default Canister({
            ${sourceCodes.join(',\n    ')}
        });
            `
            : `
        export default class {
            ${sourceCodes.join('\n    ')}
        };
    `;

    return /*TS*/ `
        import { ${imports} } from '${importLocation}';
        // @ts-ignore
        import deepEqual from 'deep-is';

        // #region Declarations
        ${declarations}
        // #endregion Declarations

        ${canister}
    `;
}
