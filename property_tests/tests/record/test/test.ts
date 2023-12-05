import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { RecordArb } from 'azle/property_tests/arbitraries/candid/constructed/record_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllRecordsQueryMethodArb = QueryMethodArb(
    fc.array(RecordArb()),
    RecordArb(),
    {
        generateBody,
        generateTests
    }
);

runPropTests(
    CanisterArb({
        queryMethods: fc.array(AllRecordsQueryMethodArb, {
            minLength: 20,
            maxLength: 100
        })
    })
);
