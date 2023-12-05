import fc from 'fast-check';

import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { BlobArb } from 'azle/property_tests/arbitraries/candid/constructed/blob_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllBlobsQueryMethodArb = QueryMethodArb(fc.array(BlobArb()), BlobArb(), {
    generateBody,
    generateTests
});

const CanisterConfigArb = fc
    .array(AllBlobsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb));
