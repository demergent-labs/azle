import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Int16Arb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int16_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllInt16sQueryMethodArb = QueryMethodArb(fc.array(Int16Arb), Int16Arb, {
    generateBody,
    generateTests
});

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllInt16sQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
