import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { NullArb } from 'azle/property_tests/arbitraries/candid/primitive/null';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const syntax = 'functional';

const AllNullsQueryMethodArb = QueryMethodArb(
    fc.array(NullArb(syntax)),
    NullArb(syntax),
    {
        generateBody,
        generateTests,
        syntax
    }
);

const CanisterConfigArb = fc
    .array(AllNullsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb, syntax));
