import {} from '@dfinity/agent';
import {} from '@dfinity/candid';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('sets certified data and gets the certificate', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const actor = await getCanisterActor<Actor>('canister');

                        // Check that getCertificate returns an empty array initially
                        const initialCertificate = await actor.getCertificate();
                        expect(initialCertificate).toEqual([]);

                        // Set the certified data
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        const updatedCertificate = await actor.getCertificate();
                        expect(updatedCertificate).toEqual([arbitraryData]);
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}
