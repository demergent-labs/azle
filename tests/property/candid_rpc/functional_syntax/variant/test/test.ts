import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { VariantArb } from 'azle/property_tests/arbitraries/candid/constructed/variant_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/property_tests/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'functional';
const context = { api, constraints: {} };

const AllVariantsQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {}
    },
    {
        generateBody,
        generateTests
    },
    fc.uniqueArray(VariantArb(context), {
        selector: (entry) => entry.src.typeAnnotation
    }),
    VariantArb(context)
);

const CanisterConfigArb = fc
    .array(AllVariantsQueryMethodArb, defaultArrayConstraints)
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));