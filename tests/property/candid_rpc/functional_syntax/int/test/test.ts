import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { IntArb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/property_tests/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'functional';
const context = { api, constraints: {} };

const AllIntsQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(IntArb(context)),
    IntArb(context)
);

const CanisterConfigArb = fc
    .array(AllIntsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
