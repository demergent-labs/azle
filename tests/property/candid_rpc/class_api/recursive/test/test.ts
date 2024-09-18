import {
    defaultArrayConstraints,
    runPropTests,
    shortArrayConstraints
} from 'azle/test/property';
import { RecursiveArb } from 'azle/test/property/arbitraries/candid/recursive';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/test/property/arbitraries/canister_methods/update_method_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const AllRecursiveQueryMethodArb = fc.oneof(
    QueryMethodArb(
        {
            api,
            constraints: {}
        },
        {
            generateBody,
            generateTests
        },
        fc.array(RecursiveArb(context)),
        RecursiveArb(context)
    ),
    UpdateMethodArb(
        {
            api,
            constraints: {}
        },
        {
            generateBody,
            generateTests
        },
        fc.array(RecursiveArb(context)),
        RecursiveArb(context)
    )
);

const arrayConstraints =
    process.env.AZLE_IS_FEATURE_BRANCH_PR === 'true' ||
    process.env.AZLE_IS_FEATURE_BRANCH_DRAFT_PR === 'true'
        ? shortArrayConstraints
        : defaultArrayConstraints;

const CanisterConfigArb = fc
    .array(AllRecursiveQueryMethodArb, arrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb), true);
