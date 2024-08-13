import { defaultArrayConstraints, runPropTests } from 'azle/property_tests';
import { ServiceArb } from 'azle/property_tests/arbitraries/candid/reference/service_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const syntax = 'functional';

const AllServicesQueryMethodArb = QueryMethodArb(
    fc.uniqueArray(ServiceArb(syntax), {
        selector: (entry) => entry.src.candidTypeAnnotation
    }),
    ServiceArb(syntax),
    {
        generateBody,
        generateTests,
        syntax
    }
);

const CanisterConfigArb = fc
    .array(AllServicesQueryMethodArb, {
        ...defaultArrayConstraints,
        maxLength: 30 // If the number of generated services is too large we will run out of space in the wasm custom section.
    })
    .map((queryMethods): CanisterConfig => {
        return { queryMethods };
    });

runPropTests(CanisterArb(CanisterConfigArb, syntax));
