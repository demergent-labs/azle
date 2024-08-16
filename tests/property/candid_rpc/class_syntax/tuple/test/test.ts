import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { TupleArb } from 'azle/property_tests/arbitraries/candid/constructed/tuple_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const syntax = 'class';

const AllTuplesQueryMethodArb = QueryMethodArb(
    fc.uniqueArray(TupleArb(syntax), {
        selector: (entry) => entry.src.candidTypeAnnotation
    }),
    TupleArb(syntax),
    {
        generateBody,
        generateTests,
        syntax
    }
);

const CanisterConfigArb = fc
    .array(AllTuplesQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb, syntax));
