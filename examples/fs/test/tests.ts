// TODO Use the directory name public instead of just_public once this is resolved: https://github.com/wasm-forge/ic-wasi-polyfill/issues/15

import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { error, Test, testEquality } from 'azle/test';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

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

                    return testEquality(responseText, 'No. files written: 1');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'No. files written: 1');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'write file sync');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'write file');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(
                        responseText,
                        'Directory public_sync created'
                    );
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(
                        responseText,
                        'Directory just_public created'
                    );
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'true');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'true');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(
                        responseText,
                        'File write-file-sync.txt deleted'
                    );
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(
                        responseText,
                        'File write-file.txt deleted'
                    );
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(
                        responseText,
                        'Directory public_sync deleted'
                    );
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(
                        responseText,
                        'Directory just_public deleted'
                    );
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'false');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'false');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'false');
                } catch (err: any) {
                    return error(err);
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

                    return testEquality(responseText, 'false');
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/high-water-mark-boundary',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/high-water-mark-boundary`
                    );
                    const responseText = await response.text();

                    return testEquality(responseText, '1');
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/create-read-stream-larger-than-high-water-mark-chunked',
            test: async () => {
                try {
                    let hasherFile = createHash('sha256');

                    const file = readFileSync('./src/image.jpg');

                    hasherFile.update(file);

                    const digestFile = hasherFile.digest('hex');

                    const response = await fetch(
                        `${origin}/create-read-stream-larger-than-high-water-mark-chunked`
                    );
                    const responseBlob = await response.blob();

                    let hasherReadStream = createHash('sha256');

                    hasherReadStream.update(
                        new Uint8Array(await responseBlob.arrayBuffer())
                    );

                    const digestReadStream = hasherReadStream.digest('hex');

                    return testEquality(digestReadStream, digestFile);
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/create-read-stream-larger-than-high-water-mark',
            test: async () => {
                try {
                    let hasherFile = createHash('sha256');

                    const file = readFileSync('./src/image.jpg');

                    hasherFile.update(file);

                    const digestFile = hasherFile.digest('hex');

                    const response = await fetch(
                        `${origin}/create-read-stream-larger-than-high-water-mark`
                    );
                    const responseBlob = await response.blob();

                    let hasherReadStream = createHash('sha256');

                    hasherReadStream.update(
                        new Uint8Array(await responseBlob.arrayBuffer())
                    );

                    const digestReadStream = hasherReadStream.digest('hex');

                    return testEquality(digestReadStream, digestFile);
                } catch (err: any) {
                    return error(err);
                }
            }
        }
    ];
}
