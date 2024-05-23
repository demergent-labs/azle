import { error, Test, testEquality } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/get-address',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/get-address`);
                    const responseText = await response.text();

                    return testEquality(
                        responseText,
                        '1PmamxRspvjCV7vDqMpzvKf92epy1utZVj'
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/get-public-key',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/get-public-key`);
                    const publicKey = await response.text();

                    return testEquality(
                        publicKey,
                        '03fad62848f1a6cde4c4d9453dadea714cbd59f1282087853de8b0c6072bec27e7'
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/get-private-key',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/get-private-key`);
                    const responseText = await response.text();

                    return testEquality(
                        responseText,
                        'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/get-private-key-wif',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/get-private-key-wif`
                    );
                    const responseText = await response.text();

                    return testEquality(
                        responseText,
                        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/create-transaction',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/create-transaction`,
                        { method: 'POST' }
                    );
                    const transaction = await response.text();

                    return testEquality(
                        transaction,
                        '02000000018689302ea03ef5dd56fb7940a867f9240fa811eddeb0fa4c87ad9ff3728f5e110000000000ffffffff01983a0000000000001976a914ad618cf4333b3b248f9744e8e81db2964d0ae39788ac00000000'
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: 'test length of message from /sign-bitcoin-message',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/sign-bitcoin-message`,
                        { method: 'POST' }
                    );
                    const responseText = await response.text();

                    return testEquality(responseText.length, 88);
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/verify-bitcoin-message',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/verify-bitcoin-message`,
                        {
                            method: 'POST'
                        }
                    );
                    const responseText = await response.json();

                    return testEquality(responseText, true);
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/fail-to-verify-bitcoin-message',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/fail-to-verify-bitcoin-message`,
                        {
                            method: 'POST'
                        }
                    );
                    const responseText = await response.json();

                    return testEquality(responseText, false);
                } catch (err: any) {
                    return error(err);
                }
            }
        }
    ];
}
