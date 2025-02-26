import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/_internal/test/property';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/_internal/test/property/arbitraries/types';
import { TupleArb } from 'azle/_internal/test/property/tuple_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const AllTuplesQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.uniqueArray(TupleArb(context), {
        selector: (entry) => entry.src.typeAnnotation
    }),
    TupleArb(context)
);

const CanisterConfigArb = fc
    .array(AllTuplesQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
