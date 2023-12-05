import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Float32Arb } from 'azle/property_tests/arbitraries/candid/primitive/floats/float32_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllFloat32sQueryMethodArb = QueryMethodArb(
    fc.array(Float32Arb),
    Float32Arb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllFloat32sQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
