import fc from 'fast-check';

import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { VariantArb } from 'azle/property_tests/arbitraries/candid/constructed/variant_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllVariantsQueryMethodArb = QueryMethodArb(
    fc.uniqueArray(VariantArb(), {
        selector: (entry) => entry.src.candidTypeAnnotation
    }),
    VariantArb(),
    {
        generateBody,
        generateTests
    }
);

const CanisterConfigArb = fc
    .array(AllVariantsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb));
