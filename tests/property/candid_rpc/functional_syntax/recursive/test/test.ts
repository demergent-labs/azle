import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { RecursiveArb } from 'azle/property_tests/arbitraries/candid/recursive';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import { Api } from 'azle/property_tests/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'functional';
const context = { api, constraints: {} };

const AllRecursiveQueryMethodArb = fc.oneof(
    QueryMethodArb(
        {
            api,
            constraints: {
                generateBody,
                generateTests
            }
        },
        fc.array(RecursiveArb(context)),
        RecursiveArb(context)
    ),
    UpdateMethodArb(
        {
            api,
            constraints: {
                generateBody,
                generateTests
            }
        },
        fc.array(RecursiveArb(context)),
        RecursiveArb(context)
    )
);

const CanisterConfigArb = fc
    .array(AllRecursiveQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb), true);
