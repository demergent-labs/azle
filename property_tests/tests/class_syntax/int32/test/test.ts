import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { Int32Arb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int32_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const syntax = 'class';

const AllInt32sQueryMethodArb = QueryMethodArb(
    fc.array(Int32Arb(syntax)),
    Int32Arb(syntax),
    {
        generateBody,
        generateTests,
        syntax
    }
);

const CanisterConfigArb = fc
    .array(AllInt32sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb, syntax));
