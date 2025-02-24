import { runTests } from 'azle/_internal/test';
import { getTests } from 'http_counter_end_to_end_test_functional_syntax/test/tests';

runTests(getTests());
