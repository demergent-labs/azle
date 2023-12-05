import fc from 'fast-check';

import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { FuncArb } from 'azle/property_tests/arbitraries/candid/reference/func_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllFuncsQueryMethodArb = QueryMethodArb(
    fc.uniqueArray(FuncArb(), {
        selector: (entry) => entry.src.candidTypeAnnotation
    }),
    FuncArb(),
    {
        generateBody,
        generateTests
    }
);

const CanisterConfigArb = fc
    .array(AllFuncsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb));
