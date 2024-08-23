import { defaultArrayConstraints, runPropTests } from 'azle/test/property';
import { Int16Arb } from 'azle/test/property/arbitraries/candid/primitive/ints/int16_arb';
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

const AllInt16sQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(Int16Arb(context)),
    Int16Arb(context)
);

const CanisterConfigArb = fc
    .array(AllInt16sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
