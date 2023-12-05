import fc from 'fast-check';

import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { Int8Arb } from 'azle/property_tests/arbitraries/candid/primitive/ints/int8_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllInt8sQueryMethodArb = QueryMethodArb(fc.array(Int8Arb()), Int8Arb(), {
    generateBody,
    generateTests
});

const CanisterConfigArb = fc
    .array(AllInt8sQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb));
