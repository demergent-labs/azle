import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { VariantArb } from 'azle/property_tests/arbitraries/candid/constructed/variant_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllVariantsQueryMethodArb = QueryMethodArb(
    fc.uniqueArray(VariantArb(), {
        selector: (entry) => entry.src.typeAnnotation
    }),
    VariantArb(),
    {
        generateBody,
        generateTests
    }
);

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllVariantsQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
