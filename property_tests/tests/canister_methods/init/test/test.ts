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
import { InitMethodArb } from 'azle/property_tests/arbitraries/canister_methods/init_method_arb';

import { generateBody as callableMethodBodyGenerator } from './generate_callable_method_body';
import { generateBody as initBodyGenerator } from './generate_init_body';
import { generateTests } from './generate_tests';
import { CorrespondingJSType } from '../../../../arbitraries/candid/corresponding_js_type';

const SimpleInitMethodArb = InitMethodArb(fc.array(CandidValueAndMetaArb()), {
    generateBody: initBodyGenerator,
    generateTests
});

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
                (param) => param.el.src.candidTypeObject
            );

            const globalInitVariableNames = initMethod.params.map(
                (_, i) => `initParam${i}`
            );
            const globalInitVariableDeclarations = initMethod.params.map(
                (param, i) =>
                    `let initParam${i}: ${param.el.src.candidTypeAnnotation};`
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
