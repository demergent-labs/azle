import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { TextArb } from 'azle/property_tests/arbitraries/candid/primitive/text';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllTextsQueryMethod = QueryMethodArb(fc.array(TextArb()), TextArb(), {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllTextsQueryMethod));
