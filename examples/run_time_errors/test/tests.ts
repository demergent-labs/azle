import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

import { getInvalidBlobTests } from './invalid_blobs';
import { getInvalidFuncTests } from './invalid_funcs';
import { getInvalidNumberTests } from './invalid_numbers';
import { getInvalidOptTests } from './invalid_opts';
import { getInvalidPrimitiveTests } from './invalid_primitives';
import { getInvalidPrincipalTests } from './invalid_principals';
import { getInvalidRecordTests } from './invalid_records';
import { getInvalidResultTests } from './invalid_results';
import { getInvalidVariantTests } from './invalid_variants';
import { getInvalidVecTests } from './invalid_vecs';
import { getThrownErrorTests } from './thrown_errors';

export function getTests(errorCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe('invalid blob tests', getInvalidBlobTests(errorCanister));
        describe('invalid func tests', getInvalidFuncTests(errorCanister));
        describe('invalid number tests', getInvalidNumberTests(errorCanister));
        describe('invalid opt tests', getInvalidOptTests(errorCanister));
        describe(
            'invalid primitive tests',
            getInvalidPrimitiveTests(errorCanister)
        );
        describe(
            'invalid principal tests',
            getInvalidPrincipalTests(errorCanister)
        );
        describe('invalid record tests', getInvalidRecordTests(errorCanister));
        describe('invalid result tests', getInvalidResultTests(errorCanister));
        describe(
            'invalid variant tests',
            getInvalidVariantTests(errorCanister)
        );
        describe('invalid vec tests', getInvalidVecTests(errorCanister));
        describe('thrown error tests', getThrownErrorTests(errorCanister));
    };
}
