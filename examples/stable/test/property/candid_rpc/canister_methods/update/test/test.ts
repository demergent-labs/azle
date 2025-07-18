import 'azle/experimental/_internal/test/set_experimental';

import {
    defaultArrayConstraints,
    runPropTests,
    shortArrayConstraints
} from 'azle/experimental/_internal/test/property';
import { CandidReturnTypeArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { UpdateMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const context = { constraints: {} };

const HeterogeneousUpdateMethodArb = UpdateMethodArb(
    {
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(CandidValueAndMetaArb(context)),
    CandidReturnTypeArb(context)
);

const arrayConstraints =
    process.env.AZLE_IS_FEATURE_BRANCH_PR === 'true' ||
    process.env.AZLE_IS_FEATURE_BRANCH_DRAFT_PR === 'true' ||
    process.env.AZLE_IS_MAIN_BRANCH_PUSH_FROM_FEATURE_MERGE === 'true'
        ? shortArrayConstraints
        : defaultArrayConstraints;

const CanisterConfigArb = fc
    .array(HeterogeneousUpdateMethodArb, arrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
