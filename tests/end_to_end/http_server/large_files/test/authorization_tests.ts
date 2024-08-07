import { generateIdentity, getCanisterId } from 'azle/dfx';
import { createActor } from 'azle/src/compiler/file_uploader/uploader_actor';
import { expect, it, please, Test } from 'azle/test';
import { v4 } from 'uuid';

export function getAuthorizationTests(): Test {
    const unauthorizedUser = `test_azle_unauthorized_${v4()}`;

    return () => {
        please('set up unauthorized user', async () => {
            generateIdentity(unauthorizedUser);
        });

        it('fails to upload from an unauthorized actor', async () => {
            const destPath = 'assets/unauthorizedAddition';
            const actor = await createActor(
                getCanisterId('backend'),
                unauthorizedUser
            );

            await expect(
                actor._azle_upload_file_chunk(
                    destPath,
                    0n,
                    0n,
                    Uint8Array.from([1, 2, 3, 4]),
                    4n
                )
            ).rejects.toThrow(
                /Not Authorized: only controllers of this canister may call this method/
            );
        });

        it('fails to get hash from an unauthorized actor', async () => {
            const actor = await createActor(
                getCanisterId('backend'),
                unauthorizedUser
            );
            await expect(
                actor._azle_get_file_hash('assets/test0B')
            ).rejects.toThrow(
                /Not Authorized: only controllers of this canister may call this method/
            );
        });

        it('fails to clear file and info from an unauthorized actor', async () => {
            const actor = await createActor(
                getCanisterId('backend'),
                unauthorizedUser
            );
            await expect(
                actor._azle_clear_file_and_info('assets/test0B')
            ).rejects.toThrow(
                /Not Authorized: only controllers of this canister may call this method/
            );
        });
    };
}
