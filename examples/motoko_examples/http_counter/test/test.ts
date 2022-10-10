import { deploy, run_tests, Test } from 'azle/test';
import { get_tests } from './tests';

const tests: Test[] = [...deploy('http_counter'), ...get_tests()];

run_tests(tests);
