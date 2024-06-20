import { expect, it, Test } from 'azle/test/jest';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('gets address using an off-the-shelf bitcoin library', async () => {
            const response = await fetch(`${origin}/get-address`);
            const responseText = await response.text();

            expect(responseText).toBe('1PmamxRspvjCV7vDqMpzvKf92epy1utZVj');
        });

        it('gets public key using an off-the-shelf bitcoin library', async () => {
            const response = await fetch(`${origin}/get-public-key`);
            const publicKey = await response.text();

            expect(publicKey).toBe(
                '03fad62848f1a6cde4c4d9453dadea714cbd59f1282087853de8b0c6072bec27e7'
            );
        });

        it('gets private key using an off-the-shelf bitcoin library', async () => {
            const response = await fetch(`${origin}/get-private-key`);
            const responseText = await response.text();

            expect(responseText).toBe(
                'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
            );
        });

        it('gets private key wif using an off-the-shelf bitcoin library', async () => {
            const response = await fetch(`${origin}/get-private-key-wif`);
            const responseText = await response.text();

            expect(responseText).toBe(
                'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
            );
        });

        it('creates transaction using an off-the-shelf bitcoin library', async () => {
            const response = await fetch(`${origin}/create-transaction`, {
                method: 'POST'
            });
            const transaction = await response.text();

            expect(transaction).toBe(
                '02000000018689302ea03ef5dd56fb7940a867f9240fa811eddeb0fa4c87ad9ff3728f5e110000000000ffffffff01983a0000000000001976a914ad618cf4333b3b248f9744e8e81db2964d0ae39788ac00000000'
            );
        });

        it('signs bitcoin message using an off-the-shelf bitcoin library', async () => {
            const response = await fetch(`${origin}/sign-bitcoin-message`, {
                method: 'POST'
            });
            const responseText = await response.text();

            expect(responseText).toHaveLength(88);
        }, 10_000);

        it('verifies a well signed bitcoin message using an off-the-shelf bitcoin library', async () => {
            const response = await fetch(`${origin}/verify-bitcoin-message`, {
                method: 'POST'
            });
            const responseJson = await response.json();

            expect(responseJson).toBe(true);
        }, 10_000);

        it('fails to verify a poorly signed bitcoin message using an off-the-shelf bitcoin library', async () => {
            const response = await fetch(
                `${origin}/fail-to-verify-bitcoin-message`,
                {
                    method: 'POST'
                }
            );
            const responseJson = await response.json();

            expect(responseJson).toBe(false);
        }, 10_000);
    };
}
