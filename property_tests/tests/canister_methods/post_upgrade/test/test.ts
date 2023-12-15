import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { CandidValueAndMetaArbWithoutFuncs as CandidValueAndMetaArb } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
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
import { generateBody as postDeployMethodBodyGenerator } from './generate_post_deploy_method_body';
import { generateTests as generateInitTests } from './generate_init_tests';
import { generateTests as generatePostUpgradeTests } from './generate_post_upgrade_tests';
import { CorrespondingJSType } from '../../../../arbitraries/candid/corresponding_js_type';
import { InitMethodArb } from 'azle/property_tests/arbitraries/canister_methods/init_method_arb';
import { globalVarName } from './global_var_name';

const CanisterConfigArb = fc
    .array(CandidValueAndMetaArb())
    .chain((postDeployParams) => {
        const postDeployParamsArb = fc.constant(postDeployParams);

        const SimpleInitMethodArb = InitMethodArb(postDeployParamsArb, {
            generateBody: postDeployMethodBodyGenerator,
            generateTests: generateInitTests
        });

        const SimplePostUpgradeMethodArb = PostUpgradeMethodArb(
            postDeployParamsArb,
            {
                generateBody: postDeployMethodBodyGenerator,
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
            postDeployParamsArb,
            SimpleInitMethodArb,
            SimplePostUpgradeMethodArb,
            fc.array(HeterogeneousQueryMethodArb, small),
            fc.array(HeterogeneousUpdateMethodArb, small)
        );
    })
    .map(
        ([
            postDeployParams,
            initMethod,
            postUpgradeMethod,
            queryMethods,
            updateMethods
        ]): CanisterConfig<CorrespondingJSType, CorrespondingJSType> => {
            const postDeployParamCandidTypeObjects = postDeployParams.map(
                (param) => param.src.candidTypeObject
            );

            const globalPostDeployVariableNames = postDeployParams.map((_, i) =>
                globalVarName(i)
            );
            const globalPostDeployVariableDeclarations = postDeployParams.map(
                (param, i) =>
                    `let ${globalVarName(i)}: ${
                        param.src.candidTypeAnnotation
                    };`
            );

            const globalDeclarations = [
                'let postDeployHookExecuted: boolean = false;',
                ...globalPostDeployVariableDeclarations
            ];

            const getPostDeployValues =
                generateGetPostDeployValuesCanisterMethod(
                    postDeployParamCandidTypeObjects,
                    globalPostDeployVariableNames
                );

            return {
                globalDeclarations,
                initMethod,
                postUpgradeMethod,
                queryMethods: [getPostDeployValues, ...queryMethods],
                updateMethods
            };
        }
    );

runPropTests(CanisterArb(CanisterConfigArb));

function generateGetPostDeployValuesCanisterMethod(
    postDeployParamCandidTypeObjects: string[],
    globalPostDeployVariableNames: string[]
): QueryMethod {
    return {
        imports: new Set(['Tuple', 'bool', 'query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `getPostDeployValues: query(
            [],
            Tuple(bool, ${postDeployParamCandidTypeObjects.join()}),
            () => { return [postDeployHookExecuted, ${globalPostDeployVariableNames.join()}]})
        `,
        tests: []
    };
}
