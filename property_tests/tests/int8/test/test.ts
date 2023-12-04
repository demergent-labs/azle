import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Int8Arb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int8_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllInt8sQueryMethod = QueryMethodArb(fc.array(Int8Arb), Int8Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllInt8sQueryMethod));
