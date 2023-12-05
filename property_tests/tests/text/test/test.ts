import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { TextArb } from 'azle/property_tests/arbitraries/candid/primitive/text';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllTextsQueryMethodArb = QueryMethodArb(fc.array(TextArb), TextArb, {
    generateBody,
    generateTests
});

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllTextsQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
