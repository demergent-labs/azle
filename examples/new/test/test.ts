import { runTests } from '../../../test'; // We don't want to install Azle
import { getTests } from './tests';

runTests(getTests());
