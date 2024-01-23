import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { CandidValueAndMetaArb } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
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
import { InitMethodArb } from 'azle/property_tests/arbitraries/canister_methods/init_method_arb';

import { generateBody as callableMethodBodyGenerator } from './generate_callable_method_body';
import { generateBody as initBodyGenerator } from './generate_init_body';
import { generateTests } from './generate_tests';
import { CorrespondingJSType } from '../../../../arbitraries/candid/corresponding_js_type';

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
    fc.array(CandidValueAndMetaArb(valueConstraints)),
    {
        generateBody: initBodyGenerator,
        generateTests
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
                (param) => param.value.src.candidTypeObject
            );

            const globalInitVariableNames = initMethod.params.map(
                (_, i) => `initParam${i}`
            );
            const globalInitVariableDeclarations = initMethod.params.map(
                (param, i) =>
                    `let initParam${i}: ${param.value.src.candidTypeAnnotation};`
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

runPropTests(CanisterArb(CanisterConfigArb));

function generateGetInitValuesCanisterMethod(
    paramTypes: string[],
    globalInitVariableNames: string[]
): QueryMethod {
    return {
        imports: new Set(['bool', 'query', 'Tuple']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `getInitValues: query(
            [],
            Tuple(bool, ${paramTypes.join()}),
            () => { return [initialized, ${globalInitVariableNames.join()}]})
        `,
        tests: []
    };
}
