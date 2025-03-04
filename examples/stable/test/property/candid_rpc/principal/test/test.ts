import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/_internal/test/property';
import { PrincipalArb } from 'azle/_internal/test/property/arbitraries/candid/reference/principal_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/_internal/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const AllPrincipalsQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.array(PrincipalArb(context)),
    PrincipalArb(context)
);

const CanisterConfigArb = fc
    .array(AllPrincipalsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
