import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { Float32Arb } from 'azle/property_tests/arbitraries/candid/primitive/floats/float32_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const syntax = 'functional';

const AllFloat32sQueryMethodArb = QueryMethodArb(
    fc.array(Float32Arb(syntax)),
    Float32Arb(syntax),
    {
        generateBody,
        generateTests,
        syntax
    }
);

const CanisterConfigArb = fc
    .array(AllFloat32sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb, syntax));
