import { Test } from 'azle/test';
import {
    _SERVICE,
    rec_0 as Entry
} from '../src/declarations/phone_book/phone_book.did';
import { ActorSubclass } from '@dfinity/agent';

const TEST_PHONE_BOOK_RECORD: Entry = {
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
                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'look up',
            test: async () => {
                const result: Entry | undefined = (
                    await phoneBookCanister.lookup('Test')
                )[0];
                return {
                    Ok:
                        result !== undefined &&
                        result.desc === TEST_PHONE_BOOK_RECORD.desc &&
                        result.phone === TEST_PHONE_BOOK_RECORD.phone
                };
            }
        }
    ];
}
