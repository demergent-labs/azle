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
import { CorrespondingJSType } from '../../../arbitraries/candid/corresponding_js_type';

const SimpleInitMethodArb = InitMethodArb(
    fc.array(CandidValueAndMetaArb(), { maxLength: 0 }),
    // TODO: Figure out how to pass params on deploy and then remove maxLength
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
                (param) => param.el.src.typeAnnotation
            );

            const globalInitVariableNames = initMethod.params.map(
                (_, i) => `initParam${i}`
            );
            const globalInitVariableDeclarations = initMethod.params.map(
                (param, i) =>
                    `let initParam${i}: ${param.el.src.typeAnnotation};`
                // TODO: src.typeAnnotation doesn't work with Vec() or Opt().
                // I need the TS type, not the Azle type
            );

            const getInitValues = generateGetInitValuesCanisterMethod(
                initParamTypes,
                globalInitVariableNames
            );

            return {
                initMethod,
                globalDeclarations: globalInitVariableDeclarations,
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
        imports: new Set(['Tuple']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `getInitValues: query(
            [],
            Tuple(${paramTypes.join()}),
            () => { return [${globalInitVariableNames.join()}]})
        `,
        tests: []
    };
}
