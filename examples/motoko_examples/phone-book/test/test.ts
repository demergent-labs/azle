import { deploy, run_tests, Test } from 'azle/test';
import { Entry } from '../canisters/azle';
import { createActor } from '../dfx_generated/azle';

const phone_book_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const TEST_PHONE_BOOK_RECORD: Entry = {
    desc: 'This is a test record',
    phone: '555-555-5555'
};

const tests: Test[] = [
    ...deploy('azle'),
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

run_tests(tests);
