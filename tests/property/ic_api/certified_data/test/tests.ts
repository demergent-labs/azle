import { ActorSubclass, Certificate, HttpAgent } from '@dfinity/agent';
import { IDL, lebDecode, PipeArrayBuffer } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { createAuthenticatedAgent, getCanisterId, whoami } from 'azle/dfx';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { findLookupValueOrThrow } from './certificate';
import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

type DeployCanisterOptions = {
    setData?: boolean;
    initData?: Uint8Array;
    force?: boolean;
};

const CANISTER_NAME = 'canister';

export function getTests(): Test {
    return () => {
        it('sets and gets certified data', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const agent = await createAuthenticatedAgent(whoami());
                        const actor = await getCanisterActor<Actor>(
                            CANISTER_NAME,
                            {
                                agent
                            }
                        );

                        await actor.setData(arbitraryData);

                        await testCertifiedData(
                            arbitraryData,
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
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
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
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        await testCertifiedData(
                            arbitraryData,
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
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        uninstallCanister();
                        deployCanister({
                            setData: true,
                            initData: arbitraryData
                        });
                        const agent = await createAuthenticatedAgent(whoami());
                        const actor = await getCanisterActor<Actor>(
                            CANISTER_NAME,
                            {
                                agent
                            }
                        );

                        // Check that getCertificate returns [0] initially
                        await testCertifiedData(
                            arbitraryData,
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
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const actor =
                            await getCanisterActor<Actor>(CANISTER_NAME);
                        uninstallCanister();
                        deployCanister();

                        // Check that getCertificate returns an empty array initially
                        expect(await actor.getData()).toEqual([]);

                        deployCanister({ setData: true, force: true });

                        // Check that getCertificate returns [0] after upgrade
                        const upgradedCertificate = await actor.getData();
                        expect(upgradedCertificate).toEqual([
                            new Uint8Array([0])
                        ]);

                        // Set the certified data
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        const updatedCertificate = await actor.getData();
                        expect(updatedCertificate).toEqual([arbitraryData]);
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('sets certified data in preUpgrade', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const actor =
                            await getCanisterActor<Actor>(CANISTER_NAME);
                        uninstallCanister();
                        deployCanister();

                        // Check that getCertificate returns an empty array initially
                        expect(await actor.getData()).toEqual([]);

                        // Upgrade the canister
                        deployCanister({ force: true });

                        // Check that getCertificate returns an empty array initially
                        expect(await actor.getData()).toEqual([]);

                        deployCanister({ force: true });

                        // Check that getCertificate returns [0] after upgrade
                        const preUpgradeCertificate = await actor.getData();
                        expect(preUpgradeCertificate).toEqual([
                            new Uint8Array([0])
                        ]);

                        // Set the certified data
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        const updatedCertificate = await actor.getData();
                        expect(updatedCertificate).toEqual([arbitraryData]);
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('always returns empty array when trying to get data certificate in update method', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const actor =
                            await getCanisterActor<Actor>(CANISTER_NAME);
                        uninstallCanister();
                        deployCanister();

                        await expect(
                            actor.getDataCertificateInUpdate()
                        ).resolves.toEqual([]);

                        await actor.setData(arbitraryData);

                        await expect(
                            actor.getDataCertificateInUpdate()
                        ).resolves.toEqual([]);
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('throws error when trying to set certified data in query method', async () => {
            const actor = await getCanisterActor<Actor>(CANISTER_NAME);
            uninstallCanister();
            deployCanister();

            await expect(
                actor.setDataCertificateInQuery()
            ).resolves.not.toThrow();
        });

        it('handles undefined data certificate', async () => {
            const actor = await getCanisterActor<Actor>(CANISTER_NAME);
            uninstallCanister();
            deployCanister();

            // Check that getCertificate returns an empty array when no data is set
            const emptyCertificate = await actor.getData();
            expect(emptyCertificate).toEqual([]);
        });

        it('throws error when trying to set certified data longer than 32 bytes', async () => {
            const actor = await getCanisterActor<Actor>(CANISTER_NAME);
            uninstallCanister();
            deployCanister();

            // Generate data longer than 32 bytes
            const longData = new Uint8Array(33).fill(1);

            // Attempt to set the long data and expect it to throw
            await expect(actor.setData(longData)).rejects.toThrow();

            // Verify that the certificate is still empty
            const certificate = await actor.getData();
            expect(certificate).toEqual([]);
        });
    };
}

function uninstallCanister(): void {
    execSync(`dfx canister uninstall-code canister || true`, {
        stdio: 'inherit'
    });
}

function deployCanister(options: DeployCanisterOptions = {}): void {
    const {
        setData = false,
        force = false,
        initData = new Uint8Array()
    } = options;
    const initDataArgument = uint8ArrayToCandidString(initData);
    console.log(initDataArgument);
    let command = `dfx deploy canister --argument '(${setData}, ${initDataArgument})'`;
    if (force) {
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
    const value = new Uint8Array(result.value);
    expect(value).toEqual(expectedValue);

    const cert = await verifyCertificate(
        result.certificate,
        agent,
        canisterPrincipal
    );
    verifyTimestamp(cert);
    verifyCertifiedData(cert, canisterPrincipal, value);
}

async function verifyCertificate(
    certificateBytes: [] | [Uint8Array | number[]],
    agent: HttpAgent,
    canisterPrincipal: Principal
): Promise<Certificate> {
    if (certificateBytes.length === 0) {
        throw new Error('No certificate found');
    }
    expect(certificateBytes.length).toBeGreaterThan(0);

    const certificate = new Uint8Array(certificateBytes[0]).buffer;

    const cert = await Certificate.create({
        certificate,
        rootKey: agent.rootKey,
        canisterId: canisterPrincipal
    });

    return cert;
}

function verifyTimestamp(cert: Certificate): void {
    const certTime = findLookupValueOrThrow(cert, ['time']);
    const decodedTime = lebDecode(new PipeArrayBuffer(certTime));
    const time = Number(decodedTime) / 1e9;

    const now = Date.now() / 1000;
    const diff = Math.abs(time - now);

    expect(diff).toBeLessThan(5);
    // Timestamp difference seems legit (< 5 sec)
}

// This function verifies the certified data in the certificate.
// Consequently it also verifies the canister ID and the value.
function verifyCertifiedData(
    cert: Certificate,
    cid: Principal,
    expectedValue: Uint8Array
): void {
    const rawData = findLookupValueOrThrow(cert, [
        'canister',
        cid.toUint8Array(),
        'certified_data'
    ]);

    const decodedData = IDL.decode(
        [IDL.Vec(IDL.Nat8)],
        new Uint8Array([
            ...new TextEncoder().encode(
                `DIDL\x01\x6d\x7b\x01\x00${expectedValue.length.toString(16)}`
            ),
            ...new Uint8Array(rawData)
        ])
    )[0];

    expect(expectedValue).toEqual(decodedData);
}
