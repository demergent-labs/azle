import { defaultArrayConstraints, runPropTests } from 'azle/test/property';
import { Nat8Arb } from 'azle/test/property/arbitraries/candid/primitive/nats/nat8_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'functional';
const context = { api, constraints: {} };

const AllNat8sQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {
            generateBody,
            generateTests
        }
    },
    fc.array(Nat8Arb(context)),
    Nat8Arb(context)
);

const CanisterConfigArb = fc
    .array(AllNat8sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
