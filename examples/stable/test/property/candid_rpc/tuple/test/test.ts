import 'azle/experimental/_internal/test/set_experimental';

import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/experimental/_internal/test/property';
import { TupleArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/constructed/tuple_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const context = { constraints: {} };

const AllTuplesQueryMethodArb = QueryMethodArb(
    {
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
