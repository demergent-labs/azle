import { defaultArrayConstraints, runPropTests } from 'azle/test/property';
import { CandidReturnTypeArb } from 'azle/test/property/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

// TODO Canister
// TODO Record
// TODO text
// TODO nat
// TODO update methods

const api: Api = 'functional';
const context = { api, constraints: {} };

const HeterogeneousQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(CandidValueAndMetaArb(context)),
    CandidReturnTypeArb(context)
);

const CanisterConfigArb = fc
    .array(HeterogeneousQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
