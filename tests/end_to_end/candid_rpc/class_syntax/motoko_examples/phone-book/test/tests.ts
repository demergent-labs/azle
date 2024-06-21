import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from '../src/declarations/phone_book/phone_book.did';

const TEST_PHONE_BOOK_RECORD = {
    desc: 'This is a test record',
    phone: '555-555-5555'
};

export function getTests(phoneBookCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('inserts a simple record', async () => {
            const result = await phoneBookCanister.insert(
                'Test',
                TEST_PHONE_BOOK_RECORD
            );

            expect(result).toBeUndefined();
        });

        it('retrieves a simple record', async () => {
            const result = (await phoneBookCanister.lookup('Test'))[0];

            expect(result).toStrictEqual(TEST_PHONE_BOOK_RECORD);
        });
    };
}
