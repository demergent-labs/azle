import 'azle/experimental/_internal/test/set_experimental';

import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/experimental/_internal/test/property';
import { Int32Arb } from 'azle/experimental/_internal/test/property/arbitraries/candid/primitive/ints/int32_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/experimental/_internal/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const AllInt32sQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(Int32Arb(context)),
    Int32Arb(context)
);

const CanisterConfigArb = fc
    .array(AllInt32sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
