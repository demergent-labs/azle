import fc from 'fast-check';

import { runPropTests } from 'azle/property_tests';
import { RecordArb } from 'azle/property_tests/arbitraries/candid/constructed/record_arb';
import { CanisterArb } from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/query_method_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const AllRecordsQueryMethod = QueryMethodArb(
    fc.array(RecordArb()),
    RecordArb(),
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(AllRecordsQueryMethod));
