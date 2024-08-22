import { defaultArrayConstraints, runPropTests } from 'azle/test/property';
import { TupleArb } from 'azle/test/property/arbitraries/candid/constructed/tuple_arb';
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

const AllTuplesQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {
            generateBody,
            generateTests
        }
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
