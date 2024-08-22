import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { TupleArb } from 'azle/property_tests/arbitraries/candid/constructed/tuple_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/property_tests/arbitraries/types';
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
