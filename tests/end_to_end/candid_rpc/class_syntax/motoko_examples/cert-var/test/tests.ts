import {
    ActorSubclass,
    Certificate,
    HttpAgent,
    LookupResultFound
} from '@dfinity/agent';
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
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/cert-var/cert-var.did';

export function getTests(): Test {
    return () => {
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
                    fc.nat({ max: 4294967295 }), // max value for Nat32
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
    newVal: number,
    certVarCanister: ActorSubclass<Actor>,
    agent: HttpAgent,
    canisterName: string
): Promise<void> {
    const canisterPrincipal = Principal.fromText(getCanisterId(canisterName));

    await certVarCanister.set(newVal);

    const result = await certVarCanister.get();

    const cert = await verifyCertificate(
        result.certificate,
        agent,
        canisterPrincipal
    );
    verifyTimestamp(cert);
    verifyCertifiedData(cert, canisterPrincipal, result.value);
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
    expectedValue: number
): void {
    const rawData = findLookupValueOrThrow(cert, [
        'canister',
        cid.toUint8Array(),
        'certified_data'
    ]);

    const decodedData = IDL.decode(
        [IDL.Nat32],
        new Uint8Array([
            ...new TextEncoder().encode('DIDL\x00\x01\x79'),
            ...new Uint8Array(rawData)
        ])
    )[0];

    expect(expectedValue).toBe(decodedData);
}

function findLookupValueOrThrow(
    cert: Certificate,
    path: (ArrayBuffer | string)[]
): ArrayBuffer {
    const lookup = findLookupOrThrow(cert, path);
    return getValueAsArrayBufferOrThrow(lookup);
}

function findLookupOrThrow(
    cert: Certificate,
    path: (ArrayBuffer | string)[]
): LookupResultFound {
    const lookup = cert.lookup(path);
    if (lookup.status !== 'found') {
        throw new Error('No value found');
    }
    return lookup as LookupResultFound;
}

function getValueAsArrayBufferOrThrow(lookup: LookupResultFound): ArrayBuffer {
    const value = lookup.value;
    if (!ArrayBuffer.isView(value) && !(value instanceof ArrayBuffer)) {
        throw new Error('Value is not an ArrayBuffer');
    }
    return value as ArrayBuffer;
}
