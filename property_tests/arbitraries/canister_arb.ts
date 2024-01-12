import fc from 'fast-check';
import { QueryMethod } from './canister_methods/query_method_arb';
import { Test } from '../../test';
import { UpdateMethod } from './canister_methods/update_method_arb';
import { InitMethod } from './canister_methods/init_method_arb';
import { CorrespondingJSType } from './candid/corresponding_js_type';
import { TextClass } from '@dfinity/candid/lib/cjs/idl';

TextClass.prototype.valueToString = function (x): string {
    return `"${escapeForBash(x)}"`;
};

export type Canister = {
    deployArgs: string[] | undefined;
    sourceCode: string;
    tests: Test[][];
};

export type CanisterConfig<
    ParamAgentArgumentValue extends CorrespondingJSType = undefined,
    ParamAgentResponseValue = undefined
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

        const deployArgs = config.initMethod?.params.map(
            ({ value: { value } }) => {
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
            deployArgs,
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
    ]
        .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
        .join();

    const declarationsFromCanisterMethods = canisterMethods.flatMap(
        (method) => method.globalDeclarations
    );

    const declarations = [
        ...globalDeclarations,
        ...declarationsFromCanisterMethods
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

function escapeCandidStringForBash(input: string) {
    return `"${escapeForBash(input.slice(1, -1))}"`;
}

function escapeForBash(input: string) {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/'/g, "'\\''") // Escape single quotes
        .replace(/"/g, '\\"'); // Escape double quotes
}
