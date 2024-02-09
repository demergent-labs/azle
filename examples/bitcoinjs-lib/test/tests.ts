import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/get-address',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/get-address`);
                    const responseText = await response.text();

                    return {
                        Ok:
                            responseText ===
                            '1PmamxRspvjCV7vDqMpzvKf92epy1utZVj'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/get-public-key',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/get-public-key`);
                    const publicKey = await response.text();

                    return {
                        Ok:
                            publicKey ===
                            '03fad62848f1a6cde4c4d9453dadea714cbd59f1282087853de8b0c6072bec27e7'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/get-private-key',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/get-private-key`);
                    const responseText = await response.text();

                    return {
                        Ok:
                            responseText ===
                            'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok:
                            responseText ===
                            'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok:
                            transaction ===
                            '02000000013ebc8203037dda39d482bf41ff3be955996c50d9d4f7cfc3d2097a694a7b067d000000006b483045022100931b6db94aed25d5486884d83fc37160f37f3368c0d7f48c757112abefec983802205fda64cff98c849577026eb2ce916a50ea70626a7669f8596dd89b720a26b4d501210365db9da3f8a260078a7e8f8b708a1161468fb2323ffda5ec16b261ec1056f455ffffffff0180380100000000001976a914ca0d36044e0dc08a22724efa6f6a07b0ec4c79aa88ac00000000'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/sign-bitcoin-message',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/sign-bitcoin-message`,
                        { method: 'POST' }
                    );
                    const responseText = await response.text();

                    return {
                        Ok:
                            responseText ===
                            '076595661fbe8eee656defdcb189bdcebeaa34f8dc8115f78c11dfb6f628744b51d16b5d91ff70217084678eeadf479a045eb6530af8d042a7f521622d9a4c38'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok: responseText === true
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok: responseText === false
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        }
    ];
}
