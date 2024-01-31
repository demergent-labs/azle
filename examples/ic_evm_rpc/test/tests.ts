// TODO Use the directory name public instead of just_public once this is resolved: https://github.com/wasm-forge/ic-wasi-polyfill/issues/15

import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/write-file-sync',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/write-file-sync`, {
                        method: 'POST',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            files: [['write-file-sync.txt', 'write file sync']]
                        })
                    });
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'No. files written: 1'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/write-file',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/write-file`, {
                        method: 'POST',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            files: [['write-file.txt', 'write file']]
                        })
                    });
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'No. files written: 1'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/read-file-sync',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/read-file-sync?filename=write-file-sync.txt`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'write file sync'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/read-file',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/read-file?filename=write-file.txt`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'write file'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/mkdir-sync',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/mkdir-sync?dirname=public_sync`,
                        {
                            method: 'POST'
                        }
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Directory public_sync created'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/mkdir',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/mkdir?dirname=just_public`,
                        {
                            method: 'POST'
                        }
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Directory just_public created'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/exists-sync public_sync true',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/exists-sync?name=public_sync`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'true'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/exists-sync just_public true',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/exists-sync?name=just_public`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'true'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/unlink-sync',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/unlink-sync?filename=write-file-sync.txt`,
                        {
                            method: 'POST'
                        }
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'File write-file-sync.txt deleted'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/unlink',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/unlink?filename=write-file.txt`,
                        {
                            method: 'POST'
                        }
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'File write-file.txt deleted'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/rmdir-sync',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/rmdir-sync?dirname=public_sync`,
                        {
                            method: 'POST'
                        }
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Directory public_sync deleted'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/rmdir',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/rmdir?dirname=just_public`,
                        {
                            method: 'POST'
                        }
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Directory just_public deleted'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/exists-sync public_sync false',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/exists-sync?name=public_sync`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'false'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/exists-sync just_public false',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/exists-sync?name=just_public`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'false'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/exists-sync write-file-sync.txt false',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/exists-sync?name=write-file-sync.txt`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'false'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/exists-sync write-file.txt false',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/exists-sync?name=write-file.txt`
                    );
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'false'
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
