import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: 'audio range requests',
            test: async () => {
                try {
                    const file = readFileSync('./src/backend/media/audio.ogg');

                    const rangeSize = 2_000_000;

                    let rangedFile = Buffer.from([]);

                    for (let i = 0; i < file.length; i += rangeSize) {
                        const response = await fetch(
                            `${origin}/media/audio.ogg`,
                            {
                                headers: [
                                    ['Range', `bytes=${i}-${i + rangeSize - 1}`]
                                ]
                            }
                        );
                        const responseBlob = await response.blob();

                        rangedFile = Buffer.concat([
                            rangedFile,
                            new Uint8Array(await responseBlob.arrayBuffer())
                        ]);

                        const result =
                            responseBlob.size === rangeSize &&
                            response.headers.get('Content-Length') ===
                                '2000000' &&
                            response.headers.get('Content-Range') ===
                                `bytes ${i}-${i + rangeSize - 1}/${
                                    file.length
                                }`;

                        if (result === false) {
                            const finalResult =
                                responseBlob.size === 1_328_518 &&
                                response.headers.get('Content-Length') ===
                                    '1328518' &&
                                response.headers.get('Content-Range') ===
                                    `bytes ${i}-${file.length - 1}/${
                                        file.length
                                    }`;

                            if (finalResult === false) {
                                return {
                                    Ok: false
                                };
                            }
                        }
                    }

                    let fileHasher = createHash('sha256');
                    fileHasher.update(file);
                    const fileDigest = fileHasher.digest('hex');

                    let rangedFileHasher = createHash('sha256');
                    rangedFileHasher.update(file);
                    const rangedFileDigest = rangedFileHasher.digest('hex');

                    return {
                        Ok: fileDigest === rangedFileDigest
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'video range requests',
            test: async () => {
                try {
                    const file = readFileSync('./src/backend/media/video.ogv');

                    const rangeSize = 2_000_000;

                    let rangedFile = Buffer.from([]);

                    for (let i = 0; i < file.length; i += rangeSize) {
                        const response = await fetch(
                            `${origin}/media/video.ogv`,
                            {
                                headers: [
                                    ['Range', `bytes=${i}-${i + rangeSize - 1}`]
                                ]
                            }
                        );
                        const responseBlob = await response.blob();

                        rangedFile = Buffer.concat([
                            rangedFile,
                            new Uint8Array(await responseBlob.arrayBuffer())
                        ]);

                        const result =
                            responseBlob.size === rangeSize &&
                            response.headers.get('Content-Length') ===
                                '2000000' &&
                            response.headers.get('Content-Range') ===
                                `bytes ${i}-${i + rangeSize - 1}/${
                                    file.length
                                }`;

                        if (result === false) {
                            const finalResult =
                                responseBlob.size === 180_129 &&
                                response.headers.get('Content-Length') ===
                                    '180129' &&
                                response.headers.get('Content-Range') ===
                                    `bytes ${i}-${file.length - 1}/${
                                        file.length
                                    }`;

                            if (finalResult === false) {
                                return {
                                    Ok: false
                                };
                            }
                        }
                    }

                    let fileHasher = createHash('sha256');
                    fileHasher.update(file);
                    const fileDigest = fileHasher.digest('hex');

                    let rangedFileHasher = createHash('sha256');
                    rangedFileHasher.update(file);
                    const rangedFileDigest = rangedFileHasher.digest('hex');

                    return {
                        Ok: fileDigest === rangedFileDigest
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
