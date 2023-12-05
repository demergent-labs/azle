import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Nat64Arb } from 'azle/property_tests/arbitraries/candid/primitive/nats/nat64_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllNat64sQueryMethod = QueryMethodArb(fc.array(Nat64Arb()), Nat64Arb(), {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNat64sQueryMethod));
