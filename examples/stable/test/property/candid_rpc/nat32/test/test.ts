import 'azle/experimental/_internal/test/set_experimental';

import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/experimental/_internal/test/property';
import { Nat32Arb } from 'azle/experimental/_internal/test/property/arbitraries/candid/primitive/nats/nat32_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const context = { constraints: {} };

const AllNat32sQueryMethodArb = QueryMethodArb(
    {
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(Nat32Arb(context)),
    Nat32Arb(context)
);

const CanisterConfigArb = fc
    .array(AllNat32sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
