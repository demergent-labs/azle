import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Nat8Arb } from 'azle/property_tests/arbitraries/candid/primitive/nats/nat8_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllNat8sQueryMethod = QueryMethodArb(fc.array(Nat8Arb), Nat8Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNat8sQueryMethod));
