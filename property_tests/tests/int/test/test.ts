import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { IntArb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllIntsQueryMethod = QueryMethodArb(fc.array(IntArb), IntArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllIntsQueryMethod));
