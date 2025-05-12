import '#experimental/test/set_experimental';

import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/experimental/_internal/test/property';
import { Float64Arb } from 'azle/experimental/_internal/test/property/arbitraries/candid/primitive/floats/float64_arb';
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

const AllFloat64sQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(Float64Arb(context)),
    Float64Arb(context)
);

const CanisterConfigArb = fc
    .array(AllFloat64sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
