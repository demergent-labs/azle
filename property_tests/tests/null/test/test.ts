import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { NullArb } from 'azle/property_tests/arbitraries/candid/primitive/null';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllNullsQueryMethodArb = QueryMethodArb(fc.array(NullArb), NullArb, {
    generateBody,
    generateTests
});

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllNullsQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
