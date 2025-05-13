import 'azle/experimental/_internal/test/set_experimental';

import { ActorSubclass, Certificate, HttpAgent } from '@dfinity/agent';
import { IDL, lebDecode, PipeArrayBuffer } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/_internal/dfx';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/_internal/test';
import {
    createAuthenticatedAgent,
    whoami
} from 'azle/experimental/_internal/dfx';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { findLookupValueOrThrow } from './certificate';
import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

type DeployCanisterOptions = {
    setData?: boolean;
    data?: Uint8Array;
    force?: boolean;
};

const CANISTER_NAME = 'canister';

export function getTests(): Test {
    return () => {
        it('sets and gets certified data', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 0, maxLength: 32 }),
                    async (data) => {
                        const agent = await createAuthenticatedAgent(whoami());
                        const actor = await getCanisterActor<Actor>(
                            CANISTER_NAME,
                            {
                                agent
                            }
                        );

                        await actor.setData(data);

                        await testCertifiedData(
                            data,
                            actor,
                            agent,
                            CANISTER_NAME
                        );
                    }
                ),
                {
                    ...defaultPropTestParams(),
                    numRuns:
                        Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1) * 10
                }
            );
        });

        it('has no certified data if none is set', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 0, maxLength: 32 }),
                    async (data) => {
                        const agent = await createAuthenticatedAgent(whoami());
                        const actor = await getCanisterActor<Actor>(
                            CANISTER_NAME,
                            {
                                agent
                            }
                        );
                        uninstallCanister(); // to clear any existing certified data
                        deployCanister();

                        // Check that getCertificate returns an empty array initially
                        await testCertifiedData(
                            new Uint8Array(),
                            actor,
                            agent,
                            CANISTER_NAME
                        );

                        // Set the certified data
                        await actor.setData(data);

                        // Check that getCertificate now returns the set data
                        await testCertifiedData(
                            data,
                            actor,
                            agent,
                            CANISTER_NAME
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('sets certified data in init', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 0, maxLength: 32 }),
                    async (data) => {
                        uninstallCanister();
                        deployCanister({
                            setData: true,
                            data
                        });
                        const agent = await createAuthenticatedAgent(whoami());
                        const actor = await getCanisterActor<Actor>(
                            CANISTER_NAME,
                            {
                                agent
                            }
                        );

                        await testCertifiedData(
                            data,
                            actor,
                            agent,
                            CANISTER_NAME
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('sets certified data in post upgrade', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 0, maxLength: 32 }),
                    async (data) => {
                        uninstallCanister();
                        deployCanister();
                        const agent = await createAuthenticatedAgent(whoami());
                        const actor = await getCanisterActor<Actor>(
                            CANISTER_NAME,
                            {
                                agent
                            }
                        );

                        // Check that getCertificate returns an empty array initially
                        await testCertifiedData(
                            new Uint8Array(),
                            actor,
                            agent,
                            CANISTER_NAME
                        );

                        deployCanister({
                            setData: true,
                            force: true,
                            data
                        });

                        await testCertifiedData(
                            data,
                            actor,
                            agent,
                            CANISTER_NAME
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('sets certified data in preUpgrade', async () => {
            const preUpgradeBytes = new Uint8Array([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
            ]);

            uninstallCanister();
            deployCanister();

            const agent = await createAuthenticatedAgent(whoami());
            const actor = await getCanisterActor<Actor>(CANISTER_NAME, {
                agent
            });

            // Check that getCertificate returns an empty array initially
            await testCertifiedData(
                new Uint8Array(),
                actor,
                agent,
                CANISTER_NAME
            );

            deployCanister({ force: true });

            // Check that getCertificate returns an empty array after first upgrade
            await testCertifiedData(
                new Uint8Array(),
                actor,
                agent,
                CANISTER_NAME
            );

            deployCanister({ force: true });

            await testCertifiedData(
                preUpgradeBytes,
                actor,
                agent,
                CANISTER_NAME
            );
        });

        it('always returns undefined (which comes out of the canister as [] (ie None)) when trying to get data certificate in update method', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 0, maxLength: 32 }),
                    async (data) => {
                        const actor =
                            await getCanisterActor<Actor>(CANISTER_NAME);

                        expect(
                            await actor.getDataCertificateInUpdate()
                        ).toEqual([]);

                        await actor.setData(data);

                        expect(
                            await actor.getDataCertificateInUpdate()
                        ).toEqual([]);
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('throws error when trying to set certified data in query method', async () => {
            const actor = await getCanisterActor<Actor>(CANISTER_NAME);
            const canisterId = getCanisterId(CANISTER_NAME);

            const expectedErrorMessage = new RegExp(
                `Call failed:\\s*Canister: ${canisterId}\\s*Method: setDataCertificateInQuery \\(query\\)\\s*"Status": "rejected"\\s*"Code": "CanisterError"\\s*"Message": "Error from Canister ${canisterId}:`
            );
            await expect(actor.setDataCertificateInQuery()).rejects.toThrow(
                expectedErrorMessage
            );
            await expect(actor.setDataCertificateInQuery()).rejects.toThrow(
                'Canister violated contract: "ic0_certified_data_set" cannot be executed in non replicated query mode'
                    .replace(/\\/g, '\\\\')
                    .replace(/"/g, '\\"')
            );
        });

        it('throws error when trying to set certified data longer than 32 bytes', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 0, maxLength: 32 }), // valid data
                    fc.uint8Array({ minLength: 33, maxLength: 100 }), // invalid data
                    async (validData, invalidData) => {
                        const agent = await createAuthenticatedAgent(whoami());
                        const canisterId = getCanisterId(CANISTER_NAME);
                        const actor = await getCanisterActor<Actor>(
                            CANISTER_NAME,
                            {
                                agent
                            }
                        );

                        // First verify we can set valid data
                        await actor.setData(validData);
                        await testCertifiedData(
                            validData,
                            actor,
                            agent,
                            CANISTER_NAME
                        );

                        // Then verify invalid data throws error
                        const expectedErrorMessage = new RegExp(
                            `Call failed:\\s*Canister: ${canisterId}\\s*Method: setData \\(update\\)\\s*"Request ID": "[a-f0-9]{64}"\\s*"Error code": "IC0504"\\s*"Reject code": "5"\\s*"Reject message": "Error from Canister ${canisterId}:`
                        );
                        await expect(
                            actor.setData(invalidData)
                        ).rejects.toThrow(expectedErrorMessage);
                        await expect(
                            actor.setData(invalidData)
                        ).rejects.toThrow(
                            'Canister violated contract: ic0_certified_data_set failed because the passed data must be no larger than 32 bytes'
                        );

                        // Verify the certificate still contains the valid data
                        await testCertifiedData(
                            validData,
                            actor,
                            agent,
                            CANISTER_NAME
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('asserts dataCertificate static and runtime types in query', async () => {
            const actor = await getCanisterActor<Actor>(CANISTER_NAME);
            expect(await actor.assertDataCertificateTypesInQuery()).toBe(true);
        });

        it('asserts dataCertificate static and runtime types in update', async () => {
            const actor = await getCanisterActor<Actor>(CANISTER_NAME);
            expect(await actor.assertDataCertificateTypesInUpdate()).toBe(true);
        });

        it('asserts setCertifiedData static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>(CANISTER_NAME);
            expect(
                await actor.assertSetCertifiedDataTypes(new Uint8Array())
            ).toBe(true);
        });
    };
}

function uninstallCanister(): void {
    execSync(`dfx canister uninstall-code canister || true`, {
        stdio: 'inherit'
    });
}

function deployCanister(options: DeployCanisterOptions = {}): void {
    const { setData = false, force = false, data = new Uint8Array() } = options;

    const dataArgument = uint8ArrayToCandidString(data);
    let command = `dfx deploy canister --argument '(${setData}, ${dataArgument})'`;

    if (force === true) {
        command += ' --upgrade-unchanged';
    }

    execSync(command, { stdio: 'inherit' });
}
function uint8ArrayToCandidString(uint8Array: Uint8Array): string {
    if (uint8Array.length === 0) {
        return 'blob ""';
    }
    return `blob "\\${Array.from(uint8Array)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('\\')}"`;
}

async function testCertifiedData(
    expectedValue: Uint8Array,
    certVarCanister: ActorSubclass<Actor>,
    agent: HttpAgent,
    canisterName: string
): Promise<void> {
    const canisterPrincipal = Principal.fromText(getCanisterId(canisterName));

    const result = await certVarCanister.getData();
    const data = new Uint8Array(result.data);
    expect(data).toEqual(expectedValue);

    const certificate = await createAndVerifyCertificate(
        result.certificate,
        agent,
        canisterPrincipal
    );
    verifyTimestamp(certificate);
    verifyCertifiedData(certificate, canisterPrincipal, data);
}

async function createAndVerifyCertificate(
    certificateBytes: [] | [Uint8Array | number[]],
    agent: HttpAgent,
    canisterPrincipal: Principal
): Promise<Certificate> {
    if (certificateBytes.length === 0) {
        throw new Error('No certificate found');
    }

    expect(certificateBytes.length).toBeGreaterThan(0);

    const certificate = new Uint8Array(certificateBytes[0]).buffer;

    const rootKey = await agent.fetchRootKey();

    return await Certificate.create({
        certificate,
        rootKey,
        canisterId: canisterPrincipal
    });
}

function verifyTimestamp(certificate: Certificate): void {
    const certificateTime = findLookupValueOrThrow(certificate, ['time']);
    const decodedTime = lebDecode(new PipeArrayBuffer(certificateTime));
    const time = Number(decodedTime) / 1e9;

    const now = Date.now() / 1_000;
    const diff = Math.abs(time - now);

    expect(diff).toBeLessThan(5);
    // Timestamp difference seems legit (< 5 sec)
}

// This function verifies the certified data in the certificate.
// Consequently it also verifies the canister ID and the value.
function verifyCertifiedData(
    certificate: Certificate,
    canisterPrincipal: Principal,
    expectedValue: Uint8Array
): void {
    const rawData = findLookupValueOrThrow(certificate, [
        'canister',
        new Uint8Array(canisterPrincipal.toUint8Array()).buffer,
        'certified_data'
    ]);

    const lengthByte = String.fromCharCode(expectedValue.length);

    const candidEncodedRawData: ArrayBuffer = new Uint8Array([
        ...new TextEncoder().encode('DIDL\x01\x6d\x7b\x01\x00'),
        ...new TextEncoder().encode(lengthByte),
        ...new Uint8Array(rawData)
    ]).buffer;

    const decodedData = IDL.decode(
        [IDL.Vec(IDL.Nat8)],
        candidEncodedRawData
    )[0];

    expect(expectedValue).toEqual(decodedData);
}
