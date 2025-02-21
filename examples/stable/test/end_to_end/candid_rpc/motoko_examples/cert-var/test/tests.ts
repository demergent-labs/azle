import { ActorSubclass, Certificate, HttpAgent } from '@dfinity/agent';
import { IDL, lebDecode, PipeArrayBuffer } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import {
    createAuthenticatedAgent,
    getCanisterId,
    whoami
} from 'azle/_internal/dfx';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';

import { findLookupValueOrThrow } from './certificate';
import { _SERVICE as Actor } from './dfx_generated/cert-var/cert-var.did';

export function getTests(): Test {
    return () => {
        it('verifies certified variable increments', async () => {
            const canisterName = 'cert-var';
            const agent = await createAuthenticatedAgent(whoami());
            const certVarCanister = await getCanisterActor<Actor>(
                canisterName,
                {
                    agent
                }
            );
            for (let i = 0; i <= 5; i++) {
                await testCertifiedVariableUpdate(
                    i,
                    certVarCanister,
                    agent,
                    canisterName
                );
                await certVarCanister.inc();
            }
        });

        it('verifies certified variable updates', async () => {
            const canisterName = 'cert-var';
            const agent = await createAuthenticatedAgent(whoami());
            const certVarCanister = await getCanisterActor<Actor>(
                canisterName,
                {
                    agent
                }
            );
            await fc.assert(
                fc.asyncProperty(
                    fc.nat({ max: 4_294_967_295 }), // max value for Nat32
                    async (arbitraryValue) => {
                        await testCertifiedVariableUpdate(
                            arbitraryValue,
                            certVarCanister,
                            agent,
                            canisterName
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });
    };
}

async function testCertifiedVariableUpdate(
    newValue: number,
    certVarCanister: ActorSubclass<Actor>,
    agent: HttpAgent,
    canisterName: string
): Promise<void> {
    const canisterPrincipal = Principal.fromText(getCanisterId(canisterName));

    await certVarCanister.set(newValue);

    const result = await certVarCanister.get();
    expect(result.value).toBe(newValue);

    const certificate = await createAndVerifyCertificate(
        result.certificate,
        agent,
        canisterPrincipal
    );
    verifyTimestamp(certificate);
    verifyCertifiedData(certificate, canisterPrincipal, result.value);
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

function verifyCertifiedData(
    certificate: Certificate,
    canisterPrincipal: Principal,
    expectedValue: number
): void {
    const canisterPrincipalBytes = canisterPrincipal.toUint8Array();

    const rawData = findLookupValueOrThrow(certificate, [
        'canister',
        canisterPrincipalBytes.buffer instanceof ArrayBuffer
            ? canisterPrincipalBytes.buffer
            : new Uint8Array(canisterPrincipalBytes).buffer,
        'certified_data'
    ]);

    const candidEncodedRawData: ArrayBuffer = new Uint8Array([
        ...new TextEncoder().encode('DIDL\x00\x01\x79'),
        ...new Uint8Array(rawData)
    ]).buffer;

    const decodedData = IDL.decode([IDL.Nat32], candidEncodedRawData)[0];

    expect(expectedValue).toBe(decodedData);
}
