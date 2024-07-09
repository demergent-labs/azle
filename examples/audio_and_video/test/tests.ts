import { expect, it, Test } from 'azle/test';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('makes range requests for audio', async () => {
            const file = readFileSync('./src/backend/media/audio.ogg');

            const rangeSize = 2_000_000;

            let rangedFile = Buffer.from([]);

            for (let i = 0; i < file.length; i += rangeSize) {
                const response = await fetch(`${origin}/media/audio.ogg`, {
                    headers: [['Range', `bytes=${i}-${i + rangeSize - 1}`]]
                });
                const responseBlob = await response.blob();

                rangedFile = Buffer.concat([
                    rangedFile,
                    new Uint8Array(await responseBlob.arrayBuffer())
                ]);

                const result =
                    responseBlob.size === rangeSize &&
                    response.headers.get('Content-Length') === '2000000' &&
                    response.headers.get('Content-Range') ===
                        `bytes ${i}-${i + rangeSize - 1}/${file.length}`;

                if (result === false) {
                    expect(responseBlob.size).toBe(1_328_518);
                    expect(response.headers.get('Content-Length')).toBe(
                        '1328518'
                    );
                    expect(response.headers.get('Content-Range')).toBe(
                        `bytes ${i}-${file.length - 1}/${file.length}`
                    );
                }
            }

            let fileHasher = createHash('sha256');
            fileHasher.update(file);
            const fileDigest = fileHasher.digest('hex');

            let rangedFileHasher = createHash('sha256');
            rangedFileHasher.update(file);
            const rangedFileDigest = rangedFileHasher.digest('hex');

            expect(fileDigest).toStrictEqual(rangedFileDigest);
        });

        it('makes range requests for video', async () => {
            const file = readFileSync('./src/backend/media/video.ogv');

            const rangeSize = 2_000_000;

            let rangedFile = Buffer.from([]);

            for (let i = 0; i < file.length; i += rangeSize) {
                const response = await fetch(`${origin}/media/video.ogv`, {
                    headers: [['Range', `bytes=${i}-${i + rangeSize - 1}`]]
                });
                const responseBlob = await response.blob();

                rangedFile = Buffer.concat([
                    rangedFile,
                    new Uint8Array(await responseBlob.arrayBuffer())
                ]);

                const result =
                    responseBlob.size === rangeSize &&
                    response.headers.get('Content-Length') === '2000000' &&
                    response.headers.get('Content-Range') ===
                        `bytes ${i}-${i + rangeSize - 1}/${file.length}`;

                if (result === false) {
                    expect(responseBlob.size).toBe(180_129);
                    expect(response.headers.get('Content-Length')).toBe(
                        '180129'
                    );
                    expect(response.headers.get('Content-Range')).toBe(
                        `bytes ${i}-${file.length - 1}/${file.length}`
                    );
                }
            }

            let fileHasher = createHash('sha256');
            fileHasher.update(file);
            const fileDigest = fileHasher.digest('hex');

            let rangedFileHasher = createHash('sha256');
            rangedFileHasher.update(file);
            const rangedFileDigest = rangedFileHasher.digest('hex');

            expect(fileDigest).toStrictEqual(rangedFileDigest);
        });
    };
}
