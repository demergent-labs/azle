import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { CandidTypeArb } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { VoidArb } from 'azle/property_tests/arbitraries/candid/primitive/void';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { CandidType } from '../../../arbitraries/candid/candid_type_arb';

// TODO Canister
// TODO Record
// TODO text
// TODO nat
// TODO update methods

const HeterogeneousQueryMethod = QueryMethodArb(
    fc.array(CandidTypeArb),
    fc.oneof(
        { arbitrary: CandidTypeArb, weight: 17 },
        { arbitrary: VoidArb, weight: 1 }
    ) as fc.Arbitrary<CandidMeta<CandidType | undefined>>,
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(HeterogeneousQueryMethod));
