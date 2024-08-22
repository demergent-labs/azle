import { defaultArrayConstraints, runPropTests } from 'azle/test/property';
import { ServiceArb } from 'azle/test/property/arbitraries/candid/reference/service_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const AllServicesQueryMethodArb = QueryMethodArb(
    {
        api,
        constraints: {
            generateBody,
            generateTests
        }
    },
    fc.uniqueArray(ServiceArb(context), {
        selector: (entry) => entry.src.typeAnnotation
    }),
    ServiceArb(context)
);

const CanisterConfigArb = fc
    .array(AllServicesQueryMethodArb, {
        ...defaultArrayConstraints,
        maxLength: 30 // If the number of generated services is too large we will run out of space in the wasm custom section.
    })
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
