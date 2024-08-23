import { runPropTests } from 'azle/property_tests';
import { candidDefinitionArb } from 'azle/property_tests/arbitraries/candid/candid_definition_arb';
import {
    CandidDefinition,
    WithShapes
} from 'azle/property_tests/arbitraries/candid/candid_definition_arb/types';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { definitionAndValueToValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb_generator';
import { CandidValueArb } from 'azle/property_tests/arbitraries/candid/candid_values_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { InitMethodArb } from 'azle/property_tests/arbitraries/canister_methods/init_method_arb';
import { PostUpgradeMethodArb } from 'azle/property_tests/arbitraries/canister_methods/post_upgrade_arb';
import {
    QueryMethod,
    QueryMethodArb
} from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import { DEFAULT_VALUE_MAX_DEPTH } from 'azle/property_tests/arbitraries/config';
import { Api } from 'azle/property_tests/arbitraries/types';
import fc from 'fast-check';

import { generateBody as callableMethodBodyGenerator } from './generate_callable_method_body';
import { generateBody as initMethodBodyGenerator } from './generate_init_method_body';
import { generateTests as generateInitTests } from './generate_init_tests';
import { generateBody as postUpgradeMethodBodyGenerator } from './generate_post_upgrade_method_body';
import { generateTests as generatePostUpgradeTests } from './generate_post_upgrade_tests';
import { globalInitVarName, globalPostUpgradeVarName } from './global_var_name';

const api: Api = 'functional';
const context = { api, constraints: {} };

const CanisterConfigArb = fc
    .array(candidDefinitionArb(context, {}))
    .chain((paramDefinitionsWithShapes) => {
        const initParamValues = definitionsToValueAndMetaArb(
            paramDefinitionsWithShapes
        );
        const postUpgradeParamValues = definitionsToValueAndMetaArb(
            paramDefinitionsWithShapes
        );
        return fc.tuple(initParamValues, postUpgradeParamValues);
    })
    .chain(([initParams, postUpgradeParams]) => {
        const initDeployParamsArb = fc.constant(initParams);
        const postUpgradeParamsArb = fc.constant(postUpgradeParams);

        const SimpleInitMethodArb = InitMethodArb(
            {
                api,
                constraints: {}
            },
            {
                generateBody: initMethodBodyGenerator,
                generateTests: generateInitTests
            },
            initDeployParamsArb
        );

        const SimplePostUpgradeMethodArb = PostUpgradeMethodArb(
            {
                api,
                constraints: {}
            },
            {
                generateBody: postUpgradeMethodBodyGenerator,
                generateTests: generatePostUpgradeTests
            },
            postUpgradeParamsArb
        );

        const HeterogeneousQueryMethodArb = QueryMethodArb(
            {
                api,
                constraints: {}
            },
            {
                generateBody: callableMethodBodyGenerator,
                generateTests: () => []
            },
            fc.array(CandidValueAndMetaArb(context)),
            CandidReturnTypeArb(context)
        );

        const HeterogeneousUpdateMethodArb = UpdateMethodArb(
            {
                api,
                constraints: {}
            },
            {
                generateBody: callableMethodBodyGenerator,
                generateTests: () => []
            },
            fc.array(CandidValueAndMetaArb(context)),
            CandidReturnTypeArb(context)
        );

        const small = {
            minLength: 0,
            maxLength: 20
        };

        return fc.tuple(
            initDeployParamsArb,
            postUpgradeParamsArb,
            SimpleInitMethodArb,
            SimplePostUpgradeMethodArb,
            fc.array(HeterogeneousQueryMethodArb, small),
            fc.array(HeterogeneousUpdateMethodArb, small)
        );
    })
    .map(
        ([
            initParams,
            postUpgradeParams,
            initMethod,
            postUpgradeMethod,
            queryMethods,
            updateMethods
        ]): CanisterConfig<CorrespondingJSType, CorrespondingJSType> => {
            const paramTypeObjects = postUpgradeParams.map(
                // The typeObjects ought to be the same so it doesn't mater which we use to generate this list
                (param) => param.src.typeObject
            );

            const globalInitVariableNames = initParams.map((_, i) =>
                globalInitVarName(i)
            );
            const globalPostUpgradeVariableNames = postUpgradeParams.map(
                (_, i) => globalPostUpgradeVarName(i)
            );
            const globalInitVariableDeclarations = initParams.map(
                (param, i) =>
                    `let ${globalInitVarName(i)}: ${param.src.typeAnnotation};`
            );
            const globalPostUpgradeVariableDeclarations = postUpgradeParams.map(
                (param, i) =>
                    `let ${globalPostUpgradeVarName(i)}: ${
                        param.src.typeAnnotation
                    };`
            );

            const globalDeclarations = [
                'let postUpgradeExecuted: boolean = false;',
                'let initExecuted: boolean = false;',
                ...globalInitVariableDeclarations,
                ...globalPostUpgradeVariableDeclarations
            ];

            const getPostUpgradeValues =
                generateGetPostUpgradeValuesCanisterMethod(
                    paramTypeObjects,
                    globalPostUpgradeVariableNames
                );

            const getInitValues = generateGetInitValuesCanisterMethod(
                paramTypeObjects,
                globalInitVariableNames
            );

            const isPostUpgradeCalled = generateIsPostUpgradeCalled(
                globalPostUpgradeVariableNames
            );

            const isInitCalled = generateIsInitCalled(globalInitVariableNames);

            return {
                globalDeclarations,
                initMethod,
                postUpgradeMethod,
                queryMethods: [
                    getInitValues,
                    getPostUpgradeValues,
                    isPostUpgradeCalled,
                    isInitCalled,
                    ...queryMethods
                ],
                updateMethods
            };
        }
    );

function generateGetPostUpgradeValuesCanisterMethod(
    paramTypeObjects: string[],
    globalVariableNames: string[]
): QueryMethod {
    return {
        imports: new Set(['Tuple', 'bool', 'query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `getPostUpgradeValues: query(
            [],
            Tuple(bool, ${paramTypeObjects.join()}),
            () => {return [postUpgradeExecuted, ${globalVariableNames.join()}]}
        )`,
        tests: []
    };
}

function generateGetInitValuesCanisterMethod(
    paramTypeObjects: string[],
    globalVariableNames: string[]
): QueryMethod {
    return {
        imports: new Set(['Tuple', 'bool', 'query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `getInitValues: query(
            [],
            Tuple(bool, ${paramTypeObjects.join()}),
            () => {return [initExecuted, ${globalVariableNames.join()}]}
        )`,
        tests: []
    };
}

function generateIsInitCalled(globalVariableNames: string[]): QueryMethod {
    const areAllParamsUndefined = globalVariableNames
        .map((name) => `${name} === undefined`)
        .join(' && ');
    const isInitCalled = `initExecuted${
        globalVariableNames.length === 0
            ? ''
            : ` || !(${areAllParamsUndefined})`
    }`;
    return {
        imports: new Set(['bool', 'query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `isInitCalled: query([], bool, () => ${isInitCalled})`,
        tests: []
    };
}

function generateIsPostUpgradeCalled(
    globalVariableNames: string[]
): QueryMethod {
    const areAllParamsUndefined = globalVariableNames
        .map((name) => `${name} === undefined`)
        .join(' && ');
    const isPostUpgradeCalled = `postUpgradeExecuted${
        globalVariableNames.length === 0
            ? ''
            : ` || !(${areAllParamsUndefined})`
    }`;
    return {
        imports: new Set(['bool', 'query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `isPostUpgradeCalled: query([], bool, () => ${isPostUpgradeCalled})`,
        tests: []
    };
}

function definitionsToValueAndMetaArb(
    definitionsWithShapes: WithShapes<CandidDefinition>[]
): fc.Arbitrary<CandidValueAndMeta<CorrespondingJSType>[]> {
    const definitions = definitionsWithShapes.map(
        (definitionWithShapes) => definitionWithShapes.definition
    );
    const recursiveShapes = definitionsWithShapes.reduce(
        (acc, definitionsWithShapes) => {
            return { ...acc, ...definitionsWithShapes.recursiveShapes };
        },
        {}
    );
    return fc
        .tuple(
            fc.constant(definitions),
            fc.tuple(
                ...definitions.map((definition) =>
                    // TODO multiplying by zero is to remove -0
                    // TODO we should open an issue with agent-js
                    // TODO the agent should encode and decode -0 correctly
                    // https://github.com/demergent-labs/azle/issues/1511
                    // TODO Infinity and NaN can't be used in this context
                    // https://github.com/dfinity/candid/issues/499
                    CandidValueArb(
                        {
                            api,
                            constraints: {
                                noDefaultInfinity: true,
                                noNaN: true,
                                noNegativeZero: true,
                                depthLevel: DEFAULT_VALUE_MAX_DEPTH
                            }
                        },
                        definition,
                        recursiveShapes
                    )
                )
            )
        )
        .map(
            ([
                definitions,
                values
            ]): CandidValueAndMeta<CorrespondingJSType>[] => {
                return values.map((value, index) => {
                    return definitionAndValueToValueAndMeta(
                        definitions[index],
                        value
                    );
                });
            }
        );
}

runPropTests(CanisterArb(context, CanisterConfigArb));
