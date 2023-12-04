import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Int32Arb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int32_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllInt32sQueryMethodArb = QueryMethodArb(fc.array(Int32Arb), Int32Arb, {
    generateBody,
    generateTests
});

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllInt32sQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
