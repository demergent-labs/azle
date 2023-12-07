import fc from 'fast-check';

import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { TupleArb } from 'azle/property_tests/arbitraries/candid/constructed/tuple_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllTuplesQueryMethodArb = QueryMethodArb(
    fc.uniqueArray(TupleArb(), {
        selector: (entry) => entry.src.candidTypeAnnotation
    }),
    TupleArb(),
    {
        generateBody,
        generateTests
    }
);

const CanisterConfigArb = fc
    .array(AllTuplesQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb));
