import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { CandidValueAndMetaArb } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

// TODO Canister
// TODO Record
// TODO text
// TODO nat
// TODO update methods

const HeterogeneousQueryMethod = QueryMethodArb(
    fc.array(CandidValueAndMetaArb),
    CandidReturnTypeArb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(HeterogeneousQueryMethod));
