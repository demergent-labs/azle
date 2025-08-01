import 'azle/experimental/_internal/test/set_experimental';

import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/experimental/_internal/test/property';
import { BlobArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/constructed/blob_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const context = { constraints: {} };

const AllBlobsQueryMethodArb = QueryMethodArb(
    {
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(BlobArb(context)),
    BlobArb(context)
);

const CanisterConfigArb = fc
    .array(AllBlobsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
