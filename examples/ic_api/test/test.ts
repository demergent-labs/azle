import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/ic_api';

const ic_api_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('ic_api'),
    // {
    //     name: 'arg_data with zero params',
    //     test: async () => {
    //         const result = await ic_api_canister.arg_data_zero_params();

    //         return {
    //             ok: Array.isArray(result) && result.length === 0
    //         };
    //     }
    // },
    // {
    //     name: 'arg_data with a single param',
    //     test: async () => {
    //         const result = await ic_api_canister.arg_data_one_param(true);

    //         return {
    //             ok: result === true
    //         };
    //     }
    // },
    // {
    //     name: 'arg_data with multiple params',
    //     test: async () => {
    //         const blobString = 'Surprise!';
    //         const blob = blobString.split('').map((char) => char.charCodeAt(0));
    //         const int = 127;
    //         const bool = true;
    //         const string = 'test';

    //         const result = await ic_api_canister.arg_data_multiple_params(
    //             blob,
    //             int,
    //             bool,
    //             string
    //         );

    //         return {
    //             ok:
    //                 result.blob.length === blob.length &&
    //                 result.blob.every((byte, i) => blob[i] === byte) &&
    //                 result.int === int &&
    //                 result.boolean === bool &&
    //                 result.string === string
    //         };
    //     }
    // },
    {
        name: 'arg_data_raw',
        test: async () => {
            const blobString = 'Surprise!';
            const blob = blobString.split('').map((char) => char.charCodeAt(0));
            const int = 127;
            const bool = true;
            const string = 'test';
            const candidString = `(blob "${blobString}", ${int} : int8, ${bool}, "${string}")`;

            const resultBytes = await ic_api_canister.arg_data_raw(
                blob,
                int,
                bool,
                string
            );
            const result = candidDecode(resultBytes);

            return {
                ok: result === candidString
            };
        }
    },
    {
        name: 'arg_data_raw_size',
        test: async () => {
            const blobString = 'Surprise!';
            const blob = blobString.split('').map((char) => char.charCodeAt(0));
            const int = 127;
            const bool = true;
            const string = 'test';

            const resultArgDataRawSize =
                await ic_api_canister.arg_data_raw_size(
                    blob,
                    int,
                    bool,
                    string
                );

            const resultArgDataRaw = await ic_api_canister.arg_data_raw(
                blob,
                int,
                bool,
                string
            );

            return {
                ok: resultArgDataRawSize === resultArgDataRaw.length
            };
        }
    },
    {
        name: 'caller',
        test: async () => {
            const result = await ic_api_canister.caller();

            return {
                ok: result.toText() === '2vxsx-fae'
            };
        }
    },
    {
        name: 'canister_balance',
        test: async () => {
            const result = await ic_api_canister.canister_balance();

            return {
                ok: result > 3_000_000_000_000n && result < 4_000_000_000_000n
            };
        }
    },
    {
        name: 'canister_balance128',
        test: async () => {
            const result = await ic_api_canister.canister_balance128();

            return {
                ok: result > 3_000_000_000_000n && result < 4_000_000_000_000n
            };
        }
    },
    {
        name: 'data_certificate from a query call',
        test: async () => {
            const result = await ic_api_canister.data_certificate();

            return {
                ok:
                    is_some(result) &&
                    Array.isArray(result[0]) &&
                    result[0].length > 0
            };
        }
    },
    {
        name: 'data_certificate from an update call',
        test: async () => {
            const result = await ic_api_canister.data_certificate_null();

            return {
                ok: is_none(result)
            };
        }
    },
    {
        name: 'id',
        test: async () => {
            const ic_api_canister_id = execSync(`dfx canister id ic_api`)
                .toString()
                .trim();

            const result = await ic_api_canister.id();

            return {
                ok: result.toText() === ic_api_canister_id
            };
        }
    },
    {
        name: 'performance_counter',
        test: async () => {
            const result = await ic_api_canister.performance_counter();

            return {
                ok: result >= 200_000n && result <= 300_000n
            };
        }
    },
    {
        name: 'print',
        test: async () => {
            const result = await ic_api_canister.print('Hello World!');

            return {
                ok: result === true
            };
        }
    },
    {
        name: 'reject',
        test: async () => {
            const rejectionMessage = 'Rejected!';
            try {
                await ic_api_canister.reject(rejectionMessage);

                return {
                    ok: false
                };
            } catch (error) {
                return {
                    ok:
                        (error as any).props.Code === 'CanisterReject' &&
                        (error as any).props.Message === rejectionMessage
                };
            }
        }
    },
    {
        name: 'set_data_certificate',
        test: async () => {
            const result = await ic_api_canister.set_certified_data([
                83, 117, 114, 112, 114, 105, 115, 101, 33
            ]);
            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'time',
        test: async () => {
            const node_time_in_nanoseconds =
                BigInt(new Date().getTime()) * 1000000n;
            const canister_time = await ic_api_canister.time();

            const difference = canister_time - node_time_in_nanoseconds;
            const positive_difference =
                difference < 0 ? difference * -1n : difference;

            // The idea is to just check that the two times are within 5 seconds of each other
            return {
                ok: positive_difference < 5 * 1_000_000_000
            };
        }
    },
    {
        name: 'trap',
        test: async () => {
            try {
                const result = await ic_api_canister.trap(
                    'here is the message'
                );

                return {
                    ok: result
                };
            } catch (error) {
                return {
                    ok:
                        (error as any).props.Message ===
                        'IC0503: Canister rrkah-fqaaa-aaaaa-aaaaq-cai trapped explicitly: here is the message'
                };
            }
        }
    }
];

run_tests(tests);

function is_none<T>(option: [] | T[]): boolean {
    return option.length === 0;
}

function is_some<T>(option: [] | T[]): boolean {
    return !is_none(option);
}

function candidDecode(bytes: number[]): string {
    const hexString = bytes
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    return execSync(`./target/bin/didc decode ${hexString}`).toString().trim();
}
