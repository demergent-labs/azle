import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/keccak256',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/keccak256?message=hello`
                    );
                    const responseText = await response.text();

                    return {
                        Ok:
                            responseText ===
                            '0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/wallet-from-private-key',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/wallet-from-private-key`
                    );
                    const responseJson = await response.json();

                    return {
                        Ok:
                            JSON.stringify(responseJson) ===
                            JSON.stringify({
                                address:
                                    '0x06A85356DCb5b307096726FB86A78c59D38e08ee',
                                publicKey:
                                    '0x04585b8820efe01a0cc841fefda079dbdc6471ccf51c4f4b86c9f9dc2ee46f2944c2ca98dc77778b9812e6628186b691058756cfb167147e71a1d428bd903a6bec',
                                privateKey:
                                    '0xafdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890'
                            })
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
