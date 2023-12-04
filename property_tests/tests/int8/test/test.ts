import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Int8Arb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int8_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllInt8sQueryMethodArb = QueryMethodArb(fc.array(Int8Arb), Int8Arb, {
    generateBody,
    generateTests
});

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllInt8sQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
