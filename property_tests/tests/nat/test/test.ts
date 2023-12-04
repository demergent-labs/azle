import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { NatArb } from 'azle/property_tests/arbitraries/candid/primitive/nats/nat_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllNatsQueryMethod = QueryMethodArb(fc.array(NatArb()), NatArb(), {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNatsQueryMethod));
