import fc from 'fast-check';
import { QueryMethod } from './canister_methods/query_method_arb';
import { Test } from '../../test';
import { UpdateMethod } from './canister_methods/update_method_arb';
import { InitMethod } from './canister_methods/init_method_arb';
import { CorrespondingJSType } from './candid/corresponding_js_type';

export type Canister = {
    sourceCode: string;
    tests: Test[];
};

export type CanisterConfig<
    ParamAgentArgumentValue extends CorrespondingJSType,
    ParamAgentResponseValue
> = {
    globalDeclarations?: string[];
    initMethod?: InitMethod<ParamAgentArgumentValue, ParamAgentResponseValue>;
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
        const canisterMethods: (
            | QueryMethod
            | UpdateMethod
            | InitMethod<ParamAgentArgumentValue, ParamAgentResponseValue>
        )[] = [
            ...(config.initMethod ? [config.initMethod] : []),
            ...(config.queryMethods ?? []),
            ...(config.updateMethods ?? [])
        ];

        const sourceCode = generateSourceCode(
            config.globalDeclarations ?? [],
            canisterMethods
        );
        const tests = canisterMethods.flatMap(
            (canisterMethod) => canisterMethod.tests
        );

        return {
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
        ...new Set(
            canisterMethods.reduce(
                (acc, method) => {
                    return [...acc, ...method.imports];
                },
                ['Canister', 'query', 'update']
            )
        )
    ].join();

    const declarationsFromCanisterMethods = canisterMethods
        .flatMap((method) => method.globalDeclarations)
        .join('\n');

    const declarations = [
        ...globalDeclarations,
        declarationsFromCanisterMethods
    ].join('\n');

    const sourceCodes = canisterMethods.map((method) => method.sourceCode);

    return /*TS*/ `
        import { ${imports} } from 'azle';
        import { deepEqual } from 'fast-equals';
        // TODO solve the underlying principal problem https://github.com/demergent-labs/azle/issues/1443
        import { Principal as DfinityPrincipal } from '@dfinity/principal';

        // #region Declarations
        ${declarations}
        // #endregion Declarations

        export default Canister({
            ${sourceCodes.join(',\n    ')}
        });
    `;
}
