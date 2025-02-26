import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/_internal/test/property';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/_internal/test/property/arbitraries/types';
import { BlobArb } from 'azle/_internal/test/property/blob_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'functional';
const context = { api, constraints: {} };

const AllBlobsQueryMethodArb = QueryMethodArb(
    {
        api,
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
