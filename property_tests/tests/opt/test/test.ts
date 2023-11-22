import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { OptArb } from 'azle/property_tests/arbitraries/candid/constructed/opt_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllOptsQueryMethod = QueryMethodArb(fc.array(OptArb), OptArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllOptsQueryMethod));
