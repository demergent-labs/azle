import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { Nat32Arb } from 'azle/property_tests/arbitraries/candid/primitive/nats/nat32_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllNat32sQueryMethodArb = QueryMethodArb(
    fc.array(Nat32Arb()),
    Nat32Arb(),
    {
        generateBody,
        generateTests
    }
);

const CanisterConfigArb = fc
    .array(AllNat32sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb));
