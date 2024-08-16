import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { Nat8Arb } from 'azle/property_tests/arbitraries/candid/primitive/nats/nat8_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const syntax = 'class';

const AllNat8sQueryMethodArb = QueryMethodArb(
    fc.array(Nat8Arb(syntax)),
    Nat8Arb(syntax),
    {
        generateBody,
        generateTests,
        syntax
    }
);

const CanisterConfigArb = fc
    .array(AllNat8sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb, syntax));
