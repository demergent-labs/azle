import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { PrincipalArb } from 'azle/property_tests/arbitraries/candid/reference/principal_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllPrincipalsQueryMethodArb = QueryMethodArb(
    fc.array(PrincipalArb()),
    PrincipalArb(),
    {
        generateBody,
        generateTests
    }
);

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllPrincipalsQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
