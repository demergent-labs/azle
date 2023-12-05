import fc from 'fast-check';

import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { Nat8Arb } from 'azle/property_tests/arbitraries/candid/primitive/nats/nat8_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllNat8sQueryMethodArb = QueryMethodArb(fc.array(Nat8Arb()), Nat8Arb(), {
    generateBody,
    generateTests
});

const CanisterConfigArb = fc
    .array(AllNat8sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb));
