import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { VecArb } from 'azle/property_tests/arbitraries/candid/constructed/vec_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllVecsQueryMethod = QueryMethodArb(fc.array(VecArb), VecArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllVecsQueryMethod));
