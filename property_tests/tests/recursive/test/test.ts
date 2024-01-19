import fc from 'fast-check';

import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { RecursiveArb } from 'azle/property_tests/arbitraries/candid/recursive';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';
import { UpdateMethodArb } from '../../../arbitraries/canister_methods/update_method_arb';

const AllRecursiveQueryMethodArb = fc.oneof(
    QueryMethodArb(fc.array(RecursiveArb()), RecursiveArb(), {
        generateBody,
        generateTests
    }),
    UpdateMethodArb(fc.array(RecursiveArb()), RecursiveArb(), {
        generateBody,
        generateTests
    })
);

const CanisterConfigArb = fc
    .array(AllRecursiveQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb), true);
