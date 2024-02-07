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
                    const responseText = await response.json();

                    return {
                        Ok:
                            responseText.hash ===
                            'f9c1437adefc936cea1e20109a5c56ad51a13de6'
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
                    const responseText = await response.json();

                    return {
                        Ok:
                            responseText.x ===
                                'fad62848f1a6cde4c4d9453dadea714cbd59f1282087853de8b0c6072bec27e7' &&
                            responseText.y ===
                                'c6d9119eb169b44403e83b5e87f98c72b01c2d4642006b1546b0040aa4e0554f'
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
                    const responseText = await response.json();

                    return {
                        Ok:
                            responseText.bn ===
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
                        `${origin}/create-transaction`
                    );
                    const responseText = await response.json();

                    return {
                        Ok:
                            responseText.hash ===
                            'e6e948df3bc1b826368fa76092d621ef67aaf4f3404b16ae85b9c61eb1a210dc'
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
                        Ok: responseText.length === 88
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
        }
    ];
}
