import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/null_example/null_example.did';

export function get_tests(
    null_example_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'null function',
            test: async () => {
                const result = await null_example_canister.null_function(null);

                return {
                    ok: result === null
                };
            }
        },
        {
            name: 'void function',
            test: async () => {
                const result = await null_example_canister.void_is_not_null();

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'get partially null record',
            test: async () => {
                const result =
                    await null_example_canister.get_partially_null_record();

                const record = {
                    first_item: 1n,
                    second_item: null,
                    third_item: 3n
                };

                return {
                    ok:
                        result.first_item === record.first_item &&
                        result.second_item === record.second_item &&
                        result.third_item === record.third_item
                };
            }
        },
        {
            name: 'set partially null record',
            test: async () => {
                const record = {
                    first_item: 5n,
                    second_item: null,
                    third_item: 15n
                };
                const result =
                    await null_example_canister.set_partially_null_record(
                        record
                    );

                return {
                    ok:
                        result.first_item === record.first_item &&
                        result.second_item === record.second_item &&
                        result.third_item === record.third_item
                };
            }
        },
        {
            name: 'get small null record',
            test: async () => {
                const result =
                    await null_example_canister.get_small_null_record();
                const record = {
                    first_item: null,
                    second_item: null
                };

                return {
                    ok:
                        result.first_item === record.first_item &&
                        result.second_item === record.second_item
                };
            }
        },
        {
            name: 'set small null record',
            test: async () => {
                const record = {
                    first_item: null,
                    second_item: null
                };
                const result =
                    await null_example_canister.set_small_null_record(record);

                return {
                    ok:
                        result.first_item === record.first_item &&
                        result.second_item === record.second_item
                };
            }
        },
        {
            name: 'get large null record',
            test: async () => {
                const result =
                    await null_example_canister.get_large_null_record();
                const record = {
                    first_item: null,
                    second_item: null,
                    third_item: null
                };

                return {
                    ok:
                        result.first_item === record.first_item &&
                        result.second_item === record.second_item &&
                        result.third_item === record.third_item
                };
            }
        },
        {
            name: 'set large null record',
            test: async () => {
                const record = {
                    first_item: null,
                    second_item: null,
                    third_item: null
                };
                const result =
                    await null_example_canister.set_large_null_record(record);

                return {
                    ok:
                        result.first_item === record.first_item &&
                        result.second_item === record.second_item &&
                        result.third_item === record.third_item
                };
            }
        }
    ];
}
