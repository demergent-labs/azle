import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { CandidValueAndMetaArb } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { InspectMessageMethodArb } from 'azle/property_tests/arbitraries/canister_methods/inspect_message_method_arb';

import { CorrespondingJSType } from '../../../../arbitraries/candid/corresponding_js_type';
import { generateTests } from './generate_tests';

export type InspectMessageBehavior = 'ACCEPT' | 'RETURN' | 'THROW';

const CanisterConfigArb = fc
    .constantFrom<InspectMessageBehavior>('ACCEPT', 'RETURN', 'THROW')
    .chain((behavior) => {
        const InspectMessageArb = InspectMessageMethodArb({
            generateBody: () => generateInspectMessageMethodBody(behavior),
            generateTests: () => []
        });

        const HeterogeneousQueryMethodArb = QueryMethodArb(
            fc.array(CandidValueAndMetaArb()),
            CandidReturnTypeArb(),
            {
                generateBody: (_, returnType) =>
                    `return ${returnType.src.valueLiteral}`,
                generateTests: (...args) =>
                    generateTests('query', ...args, behavior)
            }
        );

        const HeterogeneousUpdateMethodArb = UpdateMethodArb(
            fc.array(CandidValueAndMetaArb()),
            CandidReturnTypeArb(),
            {
                generateBody: (_, returnType) =>
                    `return ${returnType.src.valueLiteral}`,
                generateTests: (...args) =>
                    generateTests('update', ...args, behavior)
            }
        );

        const small = {
            minLength: 0,
            maxLength: 20
        };

        return fc.tuple(
            InspectMessageArb,
            fc.array(HeterogeneousQueryMethodArb, small),
            fc.array(HeterogeneousUpdateMethodArb, small)
        );
    })
    .map(
        ([inspectMessageMethod, queryMethods, updateMethods]): CanisterConfig<
            CorrespondingJSType,
            CorrespondingJSType
        > => {
            return {
                inspectMessageMethod,
                queryMethods,
                updateMethods
            };
        }
    );

runPropTests(CanisterArb(CanisterConfigArb));

function generateInspectMessageMethodBody(
    behavior: InspectMessageBehavior
): string {
    if (behavior === 'RETURN') {
        return /*TS*/ '';
    }

    if (behavior === 'THROW') {
        return /*TS*/ `throw \`Method "$\{ic.methodName()\}" not allowed\``;
    }

    return /*TS*/ `ic.acceptMessage();`;
}
