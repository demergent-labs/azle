import 'azle/experimental/_internal/test/set_experimental';

import {
    defaultArrayConstraints,
    runPropTests,
    shortArrayConstraints
} from 'azle/experimental/_internal/test/property';
import { candidDefinitionArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_definition_arb';
import { ServiceArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/reference/service_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

// Use reduced depth level (3 instead of default 5) to prevent memory exhaustion
// when generating services with recursive types. Services can have multiple methods,
// each with multiple parameters and return types, leading to exponential complexity
// growth with deeper recursive types.
const context = { constraints: { depthLevel: 2 } };

const AllServicesQueryMethodArb = QueryMethodArb(
    {
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.uniqueArray(
        ServiceArb({ constraints: {} }, candidDefinitionArb(context, {})),
        {
            selector: (entry) => entry.src.typeAnnotation
        }
    ),
    ServiceArb({ constraints: {} }, candidDefinitionArb(context, {}))
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

runPropTests(CanisterArb({ constraints: {} }, CanisterConfigArb));
