import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Int16Arb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int16_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllInt16sQueryMethod = QueryMethodArb(fc.array(Int16Arb()), Int16Arb(), {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllInt16sQueryMethod));
