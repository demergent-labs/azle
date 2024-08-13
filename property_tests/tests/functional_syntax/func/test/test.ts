import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { FuncArb } from 'azle/property_tests/arbitraries/candid/reference/func_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const syntax = 'functional';

const AllFuncsQueryMethodArb = QueryMethodArb(
    fc.uniqueArray(FuncArb(syntax), {
        selector: (entry) => entry.src.candidTypeAnnotation
    }),
    FuncArb(syntax),
    {
        generateBody,
        generateTests,
        syntax
    }
);

const CanisterConfigArb = fc
    .array(AllFuncsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb, syntax));
