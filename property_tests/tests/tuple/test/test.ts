import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { TupleArb } from 'azle/property_tests/arbitraries/candid/constructed/tuple_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllTuplesQueryMethod = QueryMethodArb(
    fc.uniqueArray(TupleArb, { selector: (entry) => entry.src.typeAnnotation }),
    TupleArb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(AllTuplesQueryMethod));
