import fc from 'fast-check';

import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { OptArb } from 'azle/property_tests/arbitraries/candid/constructed/opt_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllOptsQueryMethodArb = QueryMethodArb(fc.array(OptArb()), OptArb(), {
    generateBody,
    generateTests
});

const CanisterConfigArb = fc
    .array(AllOptsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb));
