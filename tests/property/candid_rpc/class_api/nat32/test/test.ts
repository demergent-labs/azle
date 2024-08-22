import { defaultArrayConstraints, runPropTests } from 'azle/test/property';
import { Nat32Arb } from 'azle/test/property/arbitraries/candid/primitive/nats/nat32_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const AllNat32sQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {
            generateBody,
            generateTests
        }
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
