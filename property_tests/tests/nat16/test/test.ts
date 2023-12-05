import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { Nat16Arb } from 'azle/property_tests/arbitraries/candid/primitive/nats/nat16_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllNat16sQueryMethodArb = QueryMethodArb(
    fc.array(Nat16Arb()),
    Nat16Arb(),
    {
        generateBody,
        generateTests
    }
);

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllNat16sQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
