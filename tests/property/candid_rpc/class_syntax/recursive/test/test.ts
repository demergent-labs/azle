import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { RecursiveArb } from 'azle/property_tests/arbitraries/candid/recursive';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const syntax = 'class';

const AllRecursiveQueryMethodArb = fc.oneof(
    QueryMethodArb(fc.array(RecursiveArb(syntax)), RecursiveArb(syntax), {
        generateBody,
        generateTests,
        syntax
    }),
    UpdateMethodArb(fc.array(RecursiveArb(syntax)), RecursiveArb(syntax), {
        generateBody,
        generateTests,
        syntax
    })
);

const CanisterConfigArb = fc
    .array(AllRecursiveQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb, syntax), true);
