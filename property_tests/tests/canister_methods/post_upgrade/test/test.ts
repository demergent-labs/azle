import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import {
    QueryMethod,
    QueryMethodArb
} from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { PostUpgradeMethodArb } from 'azle/property_tests/arbitraries/canister_methods/post_upgrade_arb';

import { generateBody as callableMethodBodyGenerator } from './generate_callable_method_body';
import { generateBody as postUpgradeMethodBodyGenerator } from './generate_post_upgrade_method_body';
import { generateBody as initMethodBodyGenerator } from './generate_init_method_body';
import { generateTests as generateInitTests } from './generate_init_tests';
import { generateTests as generatePostUpgradeTests } from './generate_post_upgrade_tests';
import { CorrespondingJSType } from '../../../../arbitraries/candid/corresponding_js_type';
import { InitMethodArb } from 'azle/property_tests/arbitraries/canister_methods/init_method_arb';
import { globalInitVarName, globalPostUpgradeVarName } from './global_var_name';
import { candidDefinitionArb } from '../../../../arbitraries/candid/candid_definition_arb';
import { CandidValueArb } from '../../../../arbitraries/candid/candid_values_arb';
import { definitionAndValueToValueAndMeta } from '../../../../arbitraries/candid/candid_value_and_meta_arb_generator';
import {
    CandidDefinition,
    WithShapes
} from '../../../../arbitraries/candid/candid_definition_arb/types';
import { DEFAULT_VALUE_MAX_DEPTH } from '../../../../arbitraries/config';

const CanisterConfigArb = fc
    .array(candidDefinitionArb({}))
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

        const SimpleInitMethodArb = InitMethodArb(initDeployParamsArb, {
            generateBody: initMethodBodyGenerator,
            generateTests: generateInitTests
        });

        const SimplePostUpgradeMethodArb = PostUpgradeMethodArb(
            postUpgradeParamsArb,
            {
                generateBody: postUpgradeMethodBodyGenerator,
                generateTests: generatePostUpgradeTests
            }
        );

        const HeterogeneousQueryMethodArb = QueryMethodArb(
            fc.array(CandidValueAndMetaArb()),
            CandidReturnTypeArb(),
            {
                generateBody: callableMethodBodyGenerator,
                generateTests: () => []
            }
        );

        const HeterogeneousUpdateMethodArb = UpdateMethodArb(
            fc.array(CandidValueAndMetaArb()),
            CandidReturnTypeArb(),
            {
                generateBody: callableMethodBodyGenerator,
                generateTests: () => []
            }
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
            const paramCandidTypeObjects = postUpgradeParams.map(
                // The candidTypeObjects ought to be the same so it doesn't mater which we use to generate this list
                (param) => param.src.candidTypeObject
            );

            const globalInitVariableNames = initParams.map((_, i) =>
                globalInitVarName(i)
            );
            const globalPostUpgradeVariableNames = postUpgradeParams.map(
                (_, i) => globalPostUpgradeVarName(i)
            );
            const globalInitVariableDeclarations = initParams.map(
                (param, i) =>
                    `let ${globalInitVarName(i)}: ${
                        param.src.candidTypeAnnotation
                    };`
            );
            const globalPostUpgradeVariableDeclarations = postUpgradeParams.map(
                (param, i) =>
                    `let ${globalPostUpgradeVarName(i)}: ${
                        param.src.candidTypeAnnotation
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
                    paramCandidTypeObjects,
                    globalPostUpgradeVariableNames
                );

            const getInitValues = generateGetInitValuesCanisterMethod(
                paramCandidTypeObjects,
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
    paramCandidTypeObjects: string[],
    globalVariableNames: string[]
): QueryMethod {
    return {
        imports: new Set(['Tuple', 'bool', 'query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `getPostUpgradeValues: query(
            [],
            Tuple(bool, ${paramCandidTypeObjects.join()}),
            () => {return [postUpgradeExecuted, ${globalVariableNames.join()}]}
        )`,
        tests: []
    };
}

function generateGetInitValuesCanisterMethod(
    paramCandidTypeObjects: string[],
    globalVariableNames: string[]
): QueryMethod {
    return {
        imports: new Set(['Tuple', 'bool', 'query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `getInitValues: query(
            [],
            Tuple(bool, ${paramCandidTypeObjects.join()}),
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
                    CandidValueArb(definition, recursiveShapes, {
                        noDefaultInfinity: true,
                        noNaN: true,
                        noNegativeZero: true,
                        depthLevel: DEFAULT_VALUE_MAX_DEPTH
                    })
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

runPropTests(CanisterArb(CanisterConfigArb));
