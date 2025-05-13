import 'azle/experimental/_internal/test/set_experimental';

import {
    getActor,
    runPropTests
} from 'azle/experimental/_internal/test/property';
import { CandidReturnTypeArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { PreUpgradeMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/pre_upgrade_method_arb';
import {
    QueryMethod,
    QueryMethodArb
} from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import { Api } from 'azle/experimental/_internal/test/property/arbitraries/types';
import {
    AzleResult,
    candidTestEquality
} from 'azle/experimental/_internal/test/property/test';
import fc from 'fast-check';

const api: Api = 'functional';
const context = { api, constraints: {} };

const SimplePreUpgradeArb = PreUpgradeMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody: () =>
            /*TS*/ `stable.insert(PRE_UPGRADE_HOOK_EXECUTED, true);`,
        generateTests: () => []
    }
);

const HeterogeneousQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody: (_, returnType) =>
            `return ${returnType.src.valueLiteral}`,
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
        generateBody: (_, returnType) =>
            `return ${returnType.src.valueLiteral}`,
        generateTests: () => []
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
                fc.constant<QueryMethod[]>([
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
                        const actor = await getActor(__dirname);
                        const result = await actor.getPreUpgradeExecuted();

                        return candidTestEquality(result, []);
                    }
                }
            ],
            [
                {
                    name: `pre upgrade was called after second deploy`,
                    test: async (): Promise<AzleResult> => {
                        const actor = await getActor(__dirname);
                        const result = await actor.getPreUpgradeExecuted();

                        return candidTestEquality(result, [true]);
                    }
                }
            ]
        ]
    };
}
