import { defaultArrayConstraints, runPropTests } from 'azle/test/property';
import { CandidReturnTypeArb } from 'azle/test/property/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { UpdateMethodArb } from 'azle/test/property/arbitraries/canister_methods/update_method_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const HeterogeneousUpdateMethodArb = UpdateMethodArb(
    {
        api,
        constraints: {
            generateBody,
            generateTests
        }
    },
    fc.array(CandidValueAndMetaArb(context)),
    CandidReturnTypeArb(context)
);

const CanisterConfigArb = fc
    .array(HeterogeneousUpdateMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
