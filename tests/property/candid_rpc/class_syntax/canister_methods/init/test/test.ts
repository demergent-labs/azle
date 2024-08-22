import { runPropTests } from 'azle/property_tests';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { InitMethodArb } from 'azle/property_tests/arbitraries/canister_methods/init_method_arb';
import {
    QueryMethod,
    QueryMethodArb
} from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import { Api } from 'azle/property_tests/arbitraries/types';
import fc from 'fast-check';

import { generateBody as callableMethodBodyGenerator } from './generate_callable_method_body';
import { generateBody as initBodyGenerator } from './generate_init_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

// TODO multiplying by zero is to remove -0
// TODO we should open an issue with agent-js
// TODO the agent should encode and decode -0 correctly
// https://github.com/demergent-labs/azle/issues/1511
// TODO Infinity and NaN can't be used in this context
// https://github.com/dfinity/candid/issues/499
const valueConstraints = {
    noDefaultInfinity: true,
    noNaN: true,
    noNegativeZero: true
};
const SimpleInitMethodArb = InitMethodArb(
    {
        api,
        constraints: {
            generateBody: initBodyGenerator,
            generateTests
        }
    },
    fc.array(CandidValueAndMetaArb({ api, constraints: valueConstraints }))
);

const HeterogeneousQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {
            generateBody: callableMethodBodyGenerator,
            generateTests: () => []
        }
    },
    fc.array(CandidValueAndMetaArb({ api, constraints: {} })),
    CandidReturnTypeArb({ api, constraints: {} })
);

const HeterogeneousUpdateMethodArb = UpdateMethodArb(
    {
        api,
        constraints: {
            generateBody: callableMethodBodyGenerator,
            generateTests: () => []
        }
    },
    fc.array(CandidValueAndMetaArb({ api, constraints: {} })),
    CandidReturnTypeArb({ api, constraints: {} })
);

const small = {
    minLength: 0,
    maxLength: 20
};

const CanisterConfigArb = fc
    .tuple(
        SimpleInitMethodArb,
        fc.array(HeterogeneousQueryMethodArb, small),
        fc.array(HeterogeneousUpdateMethodArb, small)
    )
    .map(
        ([initMethod, queryMethods, updateMethods]): CanisterConfig<
            CorrespondingJSType,
            CorrespondingJSType
        > => {
            const initParamTypes = initMethod.params.map(
                (param) => param.value.src.typeObject
            );

            const globalInitVariableNames = initMethod.params.map(
                (_, i) => `initParam${i}`
            );
            const globalInitVariableDeclarations = initMethod.params.map(
                (param, i) =>
                    `let initParam${i}: ${param.value.src.typeAnnotation};`
            );

            const globalDeclarations = [
                'let initialized: boolean = false;',
                ...globalInitVariableDeclarations
            ];

            const getInitValues = generateGetInitValuesCanisterMethod(
                initParamTypes,
                globalInitVariableNames
            );

            return {
                initMethod,
                globalDeclarations,
                queryMethods: [getInitValues, ...queryMethods],
                updateMethods
            };
        }
    );

runPropTests(CanisterArb(context, CanisterConfigArb));

function generateGetInitValuesCanisterMethod(
    paramTypes: string[],
    globalInitVariableNames: string[]
): QueryMethod {
    return {
        imports: new Set(['IDL', 'query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `
            @query([], IDL.Tuple(IDL.Bool, ${paramTypes.join()}))
            getInitValues(){
                return [initialized, ${globalInitVariableNames.join()}]
            }
        `,
        tests: []
    };
}
