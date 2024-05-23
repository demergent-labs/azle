import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { fail, Test, test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/ic_api/ic_api.did';

export function getTests(icApiCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'install didc',
            prep: async () => {
                execSync(
                    `cargo install --git https://github.com/dfinity/candid --rev 5d3c7c35da652d145171bc071ac11c63d73bf803 --force didc`,
                    { stdio: 'inherit' }
                );
            }
        },
        // {
        //     name: 'argData with zero params',
        //     test: async () => {
        //         const result = await icApiCanister.argDataZeroParams();

        //         return {
        //             Ok: Array.isArray(result) && result.length === 0
        //         };
        //     }
        // },
        // {
        //     name: 'argData with a single param',
        //     test: async () => {
        //         const result = await icApiCanister.argDataOneParam(true);

        //         return {
        //             Ok: result === true
        //         };
        //     }
        // },
        // {
        //     name: 'argData with multiple params',
        //     test: async () => {
        //         const blobString = 'Surprise!';
        //         const blob = blobString.split('').map((char) => char.charCodeAt(0));
        //         const int = 127;
        //         const bool = true;
        //         const string = 'test';

        //         const result = await icApiCanister.argDataMultipleParams(
        //             blob,
        //             int,
        //             bool,
        //             string
        //         );

        //         return {
        //             Ok:
        //                 result.blob.length === blob.length &&
        //                 result.blob.every((byte, i) => blob[i] === byte) &&
        //                 result.int === int &&
        //                 result.boolean === bool &&
        //                 result.string === string
        //         };
        //     }
        // },
        {
            name: 'argDataRaw',
            test: async () => {
                const blobString = 'Surprise!';
                const blob = Uint8Array.from(
                    blobString.split('').map((char) => char.charCodeAt(0))
                );
                const int = 127;
                const bool = true;
                const string = 'test';
                const candidString = `(blob "${blobString}", ${int} : int8, ${bool}, "${string}")`;

                const resultBytes = await icApiCanister.argDataRaw(
                    blob,
                    int,
                    bool,
                    string
                );
                const result = candidDecode(resultBytes);

                return testEquality(result, candidString);
            }
        },
        {
            name: 'argDataRawSize',
            test: async () => {
                const blobString = 'Surprise!';
                const blob = Uint8Array.from(
                    blobString.split('').map((char) => char.charCodeAt(0))
                );
                const int = 127;
                const bool = true;
                const string = 'test';

                const resultArgDataRawSize = await icApiCanister.argDataRawSize(
                    blob,
                    int,
                    bool,
                    string
                );

                const resultArgDataRaw = await icApiCanister.argDataRaw(
                    blob,
                    int,
                    bool,
                    string
                );

                return testEquality(
                    resultArgDataRawSize,
                    resultArgDataRaw.length
                );
            }
        },
        {
            name: 'caller',
            test: async () => {
                const result = await icApiCanister.caller();

                return testEquality(result.toText(), '2vxsx-fae');
            }
        },
        {
            name: 'canisterBalance',
            test: async () => {
                const result = await icApiCanister.canisterBalance();

                const expectedMin = 2_000_000_000_000n;
                const expectedMax = 4_000_000_000_000n;
                return test(
                    result > 2_000_000_000_000n && result < 4_000_000_000_000n,
                    `Expected balance between ${expectedMin} and ${expectedMax}. Received: ${result}`
                );
            }
        },
        {
            name: 'canisterBalance128',
            test: async () => {
                const result = await icApiCanister.canisterBalance128();

                const expectedMin = 2_000_000_000_000n;
                const expectedMax = 4_000_000_000_000n;
                return test(
                    result > 2_000_000_000_000n && result < 4_000_000_000_000n,
                    `Expected balance between ${expectedMin} and ${expectedMax}. Received: ${result}`
                );
            }
        },
        {
            name: 'canisterVersion',
            test: async () => {
                const result = await icApiCanister.canisterVersion();

                return test(
                    result >= 0n,
                    `Expected canister version to be greater or equal to 0. Received ${result}`
                );
            }
        },
        {
            name: 'dataCertificate from a query call',
            test: async () => {
                const result = await icApiCanister.dataCertificate();

                return test(result[0] !== undefined && result[0].length > 0);
            }
        },
        {
            name: 'dataCertificate from an update call',
            test: async () => {
                const result = await icApiCanister.dataCertificateNull();

                return test(isNone(result));
            }
        },
        {
            name: 'id',
            test: async () => {
                const icApiCanisterId = execSync(`dfx canister id ic_api`)
                    .toString()
                    .trim();

                const result = await icApiCanister.id();

                return testEquality(result.toText(), icApiCanisterId);
            }
        },
        {
            name: 'instructionCounter',
            test: async () => {
                const result = await icApiCanister.instructionCounter();

                return test(
                    result >= 0n,
                    `Expected instruction counter to be greater or equal to 0. Received ${result}`
                );
            }
        },
        {
            name: 'isController',
            test: async () => {
                const principal = Principal.fromText(
                    execSync(`dfx identity get-principal`).toString().trim()
                );

                const result = await icApiCanister.isController(principal);

                return test(result);
            }
        },
        {
            name: 'performanceCounter',
            test: async () => {
                const result = await icApiCanister.performanceCounter();

                return test(
                    result >= 0n,
                    `Expected performance counter to be greater or equal to 0. Received ${result}`
                );
            }
        },
        {
            name: 'print',
            test: async () => {
                const result = await icApiCanister.print('Hello World!');

                return test(result);
            }
        },
        {
            name: 'reject',
            test: async () => {
                const rejectionMessage = 'Rejected!';
                try {
                    await icApiCanister.reject(rejectionMessage);

                    return fail();
                } catch (error) {
                    return test(
                        (error as any).props.Code === 'CanisterReject' &&
                            (error as any).props.Message === rejectionMessage
                    );
                }
            }
        },
        {
            name: 'setDataCertificate',
            test: async () => {
                const result = await icApiCanister.setCertifiedData(
                    Uint8Array.from([83, 117, 114, 112, 114, 105, 115, 101, 33])
                );
                return testEquality(result, undefined);
            }
        },
        {
            name: 'time',
            test: async () => {
                const nodeTimeInNanoseconds =
                    BigInt(new Date().getTime()) * 1000000n;
                const canisterTime = await icApiCanister.time();

                const difference = canisterTime - nodeTimeInNanoseconds;
                const positiveDifference =
                    difference < 0 ? difference * -1n : difference;

                // The idea is to just check that the two times are within 5 seconds of each other
                return test(positiveDifference < 5 * 1_000_000_000);
            }
        },
        {
            name: 'trap',
            test: async () => {
                try {
                    const result = await icApiCanister.trap(
                        'here is the message'
                    );

                    return fail(result.toString());
                } catch (error) {
                    return testEquality(
                        (error as any).props.Message,
                        `IC0503: Canister ${getCanisterId(
                            'ic_api'
                        )} trapped explicitly: here is the message`
                    );
                }
            }
        }
    ];
}

function isNone<T>(option: [] | T[]): boolean {
    return option.length === 0;
}

function candidDecode(bytes: Uint8Array | number[]): string {
    const hexString = [...bytes]
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    return execSync(`didc decode ${hexString}`).toString().trim();
}
