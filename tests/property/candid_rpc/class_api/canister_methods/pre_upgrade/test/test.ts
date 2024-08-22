import { getActor, runPropTests } from 'azle/test/property';
import { CandidReturnTypeArb } from 'azle/test/property/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/test/property/arbitraries/candid/corresponding_js_type';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { PreUpgradeMethodArb } from 'azle/test/property/arbitraries/canister_methods/pre_upgrade_method_arb';
import {
    QueryMethod,
    QueryMethodArb
} from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/test/property/arbitraries/canister_methods/update_method_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import { AzleResult, testEquality } from 'azle/test/property/test';
import fc from 'fast-check';

const api: Api = 'class';
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
                /*TS*/ `let stable = StableBTreeMap<string, boolean>(0);`
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
        imports: new Set(['query', 'StableBTreeMap', 'IDL']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `
            @query([], IDL.Opt(IDL.Bool))
            getPreUpgradeExecuted(){
                const result = stable.get(PRE_UPGRADE_HOOK_EXECUTED)
                if (result === null) {
                    return []
                } else {
                    return [result]
                }
            }`,
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
