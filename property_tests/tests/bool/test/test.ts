import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { BoolArb } from 'azle/property_tests/arbitraries/candid/primitive/bool';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllBoolsQueryMethod = QueryMethodArb(fc.array(BoolArb()), BoolArb(), {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllBoolsQueryMethod));
