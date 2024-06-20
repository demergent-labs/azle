import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { expect, it, please, Test } from 'azle/test/jest';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/ic_api/ic_api.did';

export function getTests(icApiCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        please('install didc', async () => {
            execSync(
                `cargo install --git https://github.com/dfinity/candid --rev 5d3c7c35da652d145171bc071ac11c63d73bf803 --force didc`,
                { stdio: 'inherit' }
            );
        });

        // it('calls argData on the ic object with zero params', async () => {
        //     const result = await icApiCanister.argDataZeroParams();

        //     expect(Array.isArray(result)).toBe(true);
        //     expect(result.length).toBe(0);
        // });

        // it('calls argData on the ic object with a single param', async () => {
        //     const result = await icApiCanister.argDataOneParam(true);

        //     expect(result).toBe(true);
        // });

        // it('calls argData on the ic object with multiple params', async () => {
        //     const blobString = 'Surprise!';
        //     const blob = blobString.split('').map((char) => char.charCodeAt(0));
        //     const int = 127;
        //     const bool = true;
        //     const string = 'test';

        //     const result = await icApiCanister.argDataMultipleParams(
        //         blob,
        //         int,
        //         bool,
        //         string
        //     );

        //     const expected = {
        //         blob,
        //         int,
        //         boolean: bool,
        //         string
        //     };

        //     expect(result).toStrictEqual(expected);
        // });

        it('calls argDataRaw on the ic object', async () => {
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

            expect(result).toBe(candidString);
        });

        it('calls argDataRawSize on the ic object', async () => {
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

            expect(resultArgDataRaw).toHaveLength(resultArgDataRawSize);
        });

        it('calls caller on the ic object', async () => {
            const result = await icApiCanister.caller();

            expect(result.toText()).toBe('2vxsx-fae');
        });

        it('calls canisterBalance on the ic object', async () => {
            const result = await icApiCanister.canisterBalance();

            expect(result).toBeGreaterThan(2_000_000_000_000n);
            expect(result).toBeLessThan(4_000_000_000_000n);
        });

        it('calls canisterBalance128 on the ic object', async () => {
            const result = await icApiCanister.canisterBalance128();

            expect(result).toBeGreaterThan(2_000_000_000_000n);
            expect(result).toBeLessThan(4_000_000_000_000n);
        });

        it('calls canisterVersion on the ic object', async () => {
            const result = await icApiCanister.canisterVersion();

            expect(result).toBeGreaterThanOrEqual(0);
        });

        it('calls dataCertificate on the ic object from a query call', async () => {
            const result = await icApiCanister.dataCertificate();

            expect(result[0]).not.toBeUndefined();
            expect(result[0]?.length).toBeGreaterThan(0);
        });

        it('calls dataCertificate on the ic object from an update call', async () => {
            const result = await icApiCanister.dataCertificateNull();

            expect(result).toHaveLength(0);
        });

        it('calls id on the ic object', async () => {
            const icApiCanisterId = execSync(`dfx canister id ic_api`)
                .toString()
                .trim();

            const result = await icApiCanister.id();

            expect(result.toText()).toBe(icApiCanisterId);
        });

        it('calls instructionCounter on the ic object', async () => {
            const result = await icApiCanister.instructionCounter();

            expect(result).toBeGreaterThan(0n);
        });

        it('calls isController on the ic object', async () => {
            const principal = Principal.fromText(
                execSync(`dfx identity get-principal`).toString().trim()
            );

            const result = await icApiCanister.isController(principal);

            expect(result).toBe(true);
        });

        it('calls performanceCounter on the ic object', async () => {
            const result = await icApiCanister.performanceCounter();

            expect(result).toBeGreaterThan(0n);
        });

        it('calls print on the ic object', async () => {
            const result = await icApiCanister.print('Hello World!');

            expect(result).toBe(true);
        });

        it('calls reject on the ic object', async () => {
            const rejectionMessage = 'Rejected!';

            await expect(
                icApiCanister.reject(rejectionMessage)
            ).rejects.toThrow(rejectionMessage);
        });

        it('calls setDataCertificate on the ic object', async () => {
            const result = await icApiCanister.setCertifiedData(
                Uint8Array.from([83, 117, 114, 112, 114, 105, 115, 101, 33])
            );

            expect(result).toBeUndefined();
        });

        it('calls time on the ic object', async () => {
            const nodeTimeInNanoseconds =
                BigInt(new Date().getTime()) * 1000000n;
            const canisterTime = await icApiCanister.time();

            const difference = canisterTime - nodeTimeInNanoseconds;
            const positiveDifference =
                difference < 0 ? difference * -1n : difference;

            // The idea is to just check that the two times are within 5 seconds of each other
            expect(positiveDifference).toBeLessThan(5 * 1_000_000_000);
        });

        it('calls trap on the ic object', async () => {
            const message = 'here is the message';
            await expect(icApiCanister.trap(message)).rejects.toThrow(
                `IC0503: Error from Canister ${getCanisterId(
                    'ic_api'
                )}: Canister trapped explicitly: ${message}`
            );
        });
    };
}

function candidDecode(bytes: Uint8Array | number[]): string {
    const hexString = [...bytes]
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    return execSync(`didc decode ${hexString}`).toString().trim();
}
