import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { FuncArb } from 'azle/property_tests/arbitraries/candid/reference/func_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllFuncsQueryMethod = QueryMethodArb(
    fc.uniqueArray(FuncArb, { selector: (entry) => entry.src.typeAnnotation }),
    FuncArb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(AllFuncsQueryMethod));
