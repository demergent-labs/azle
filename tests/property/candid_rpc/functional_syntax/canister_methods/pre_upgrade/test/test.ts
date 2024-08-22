import { getActor, runPropTests } from 'azle/property_tests';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { PreUpgradeMethodArb } from 'azle/property_tests/arbitraries/canister_methods/pre_upgrade_method_arb';
import {
    QueryMethod,
    QueryMethodArb
} from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import { Api } from 'azle/property_tests/arbitraries/types';
import { AzleResult, testEquality } from 'azle/property_tests/test';
import fc from 'fast-check';

const api: Api = 'functional';
const context = { api, constraints: {} };

const SimplePreUpgradeArb = PreUpgradeMethodArb({
    api,
    constraints: {
        generateBody: () =>
            /*TS*/ `stable.insert(PRE_UPGRADE_HOOK_EXECUTED, true);`,
        generateTests: () => []
    }
});

const HeterogeneousQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {
            generateBody: (_, returnType) =>
                `return ${returnType.src.valueLiteral}`,
            generateTests: () => []
        }
    },
    fc.array(CandidValueAndMetaArb(context)),
    CandidReturnTypeArb(context)
);

const HeterogeneousUpdateMethodArb = UpdateMethodArb(
    {
        api,
        constraints: {
            generateBody: (_, returnType) =>
                `return ${returnType.src.valueLiteral}`,
            generateTests: () => []
        }
    },
    fc.array(CandidValueAndMetaArb(context)),
    CandidReturnTypeArb(context)
);

const small = {
    minLength: 0,
    maxLength: 20
};

const CanisterConfigArb = fc
    .tuple(
        SimplePreUpgradeArb,
        fc
            .array(HeterogeneousQueryMethodArb, small)
            .chain((queryMethods) =>
                fc.constant([
                    generateGetPreUpgradeExecutedCanisterMethod(),
                    ...queryMethods
                ])
            ),
        fc.array(HeterogeneousUpdateMethodArb, small)
    )

    .map(
        ([preUpgradeMethod, queryMethods, updateMethods]): CanisterConfig<
            CorrespondingJSType,
            CorrespondingJSType
        > => {
            const globalDeclarations = [
                /*TS*/ `const PRE_UPGRADE_HOOK_EXECUTED = 'PRE_UPGRADE_HOOK_EXECUTED';`,
                /*TS*/ `let stable = StableBTreeMap<text, bool>(0);`
            ];

            return {
                globalDeclarations,
                preUpgradeMethod,
                queryMethods,
                updateMethods
            };
        }
    );

runPropTests(CanisterArb(context, CanisterConfigArb));

function generateGetPreUpgradeExecutedCanisterMethod(): QueryMethod {
    return {
        imports: new Set([
            'bool',
            'query',
            'StableBTreeMap',
            'text',
            'Opt',
            'None',
            'Some'
        ]),
        globalDeclarations: [],
        sourceCode: /*TS*/ `getPreUpgradeExecuted: query([], Opt(bool),() => {
            const result = stable.get(PRE_UPGRADE_HOOK_EXECUTED)
            if (result === null) {
                return None
            } else {
                return Some(result)
            }
        })`,
        tests: [
            [
                {
                    name: `pre upgrade was not called after first deploy`,
                    test: async (): Promise<AzleResult> => {
                        const actor = getActor(__dirname);
                        const result = await actor.getPreUpgradeExecuted();

                        return testEquality(result, []);
                    }
                }
            ],
            [
                {
                    name: `pre upgrade was called after second deploy`,
                    test: async (): Promise<AzleResult> => {
                        const actor = getActor(__dirname);
                        const result = await actor.getPreUpgradeExecuted();

                        return testEquality(result, [true]);
                    }
                }
            ]
        ]
    };
}
