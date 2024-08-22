import { runTests } from 'azle/test';
import { getTests } from 'http_counter_end_to_end_test_functional_api/test/tests';

runTests(getTests());
