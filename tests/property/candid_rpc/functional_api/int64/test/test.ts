import { defaultArrayConstraints, runPropTests } from 'azle/test/property';
import { Int64Arb } from 'azle/test/property/arbitraries/candid/primitive/ints/int64_arb';
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

const AllInt64sQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {
            generateBody,
            generateTests
        }
    },
    fc.array(Int64Arb(context)),
    Int64Arb(context)
);

const CanisterConfigArb = fc
    .array(AllInt64sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
