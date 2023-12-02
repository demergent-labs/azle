import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Float32Arb } from 'azle/property_tests/arbitraries/candid/primitive/floats/float32_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllFloat32sQueryMethod = QueryMethodArb(
    fc.array(Float32Arb()),
    Float32Arb(),
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(AllFloat32sQueryMethod));
