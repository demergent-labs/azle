import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { CandidTypeArb } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const HeterogeneousUpdateMethodArb = UpdateMethodArb(
    fc.array(CandidTypeArb),
    CandidReturnTypeArb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(
    CanisterArb({
        updateMethods: fc.array(HeterogeneousUpdateMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
