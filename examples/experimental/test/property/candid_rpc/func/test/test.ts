import {
    defaultArrayConstraints,
    runPropTests
} from 'azle/_internal/test/property';
import { FuncArb } from 'azle/_internal/test/property/arbitraries/candid/reference/func_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/_internal/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'functional';
const context = { api, constraints: {} };

const AllFuncsQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.uniqueArray(FuncArb(context), {
        selector: (entry) => entry.src.typeAnnotation
    }),
    FuncArb(context)
);

const CanisterConfigArb = fc
    .array(AllFuncsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
