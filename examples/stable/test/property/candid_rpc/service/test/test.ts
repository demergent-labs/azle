import {
    defaultArrayConstraints,
    runPropTests,
    shortArrayConstraints
} from 'azle/experimental/_internal/test/property';
import { ServiceArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/reference/service_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/experimental/_internal/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const AllServicesQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.uniqueArray(ServiceArb(context), {
        selector: (entry) => entry.src.typeAnnotation
    }),
    ServiceArb(context)
);

const arrayConstraints =
    process.env.AZLE_IS_FEATURE_BRANCH_PR === 'true' ||
    process.env.AZLE_IS_FEATURE_BRANCH_DRAFT_PR === 'true' ||
    process.env.AZLE_IS_MAIN_BRANCH_PUSH_FROM_FEATURE_MERGE === 'true'
        ? shortArrayConstraints
        : {
              ...defaultArrayConstraints,
              maxLength: 30 // If the number of generated services is too large we will run out of space in the Wasm custom section.
          };

const CanisterConfigArb = fc
    .array(AllServicesQueryMethodArb, arrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
