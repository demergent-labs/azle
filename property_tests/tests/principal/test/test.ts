import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { PrincipalArb } from 'azle/property_tests/arbitraries/candid/reference/principal_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllPrincipalsQueryMethod = QueryMethodArb(
    fc.array(PrincipalArb),
    PrincipalArb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(AllPrincipalsQueryMethod));
