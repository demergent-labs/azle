import { Test } from 'azle/test';
import { Entry } from '../canisters/azle';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

const TEST_PHONE_BOOK_RECORD: Entry = {
    desc: 'This is a test record',
    phone: '555-555-5555'
};

export function get_tests(
    phone_book_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'insert',
            test: async () => {
                const result = await phone_book_canister.insert(
                    'Test',
                    TEST_PHONE_BOOK_RECORD
                );
                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'look up',
            test: async () => {
                const result: Entry | undefined = (
                    await phone_book_canister.lookup('Test')
                )[0];
                return {
                    ok:
                        result !== undefined &&
                        result.desc === TEST_PHONE_BOOK_RECORD.desc &&
                        result.phone === TEST_PHONE_BOOK_RECORD.phone
                };
            }
        }
    ];
}
