import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from '../src/declarations/phone_book/phone_book.did';

const TEST_PHONE_BOOK_RECORD = {
    desc: 'This is a test record',
    phone: '555-555-5555'
};

export function getTests(phoneBookCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'insert',
            test: async () => {
                const result = await phoneBookCanister.insert(
                    'Test',
                    TEST_PHONE_BOOK_RECORD
                );

                return testEquality(result, undefined);
            }
        },
        {
            name: 'look up',
            test: async () => {
                const result = (await phoneBookCanister.lookup('Test'))[0];

                return testEquality(result, TEST_PHONE_BOOK_RECORD);
            }
        }
    ];
}
