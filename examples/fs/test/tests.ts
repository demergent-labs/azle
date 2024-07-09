// TODO Use the directory name public instead of just_public once this is resolved: https://github.com/wasm-forge/ic-wasi-polyfill/issues/15

import { expect, it, Test } from 'azle/test';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('executes `fs.writeFileSync` from a canister', async () => {
            const response = await fetch(`${origin}/write-file-sync`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    files: [['write-file-sync.txt', 'write file sync']]
                })
            });
            const responseText = await response.text();

            expect(responseText).toBe('No. files written: 1');
        });

        it('executes `fs.writeFile` from a canister', async () => {
            const response = await fetch(`${origin}/write-file`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    files: [['write-file.txt', 'write file']]
                })
            });
            const responseText = await response.text();

            expect(responseText).toBe('No. files written: 1');
        });

        it('executes `fs.readFileSync` from a canister', async () => {
            const response = await fetch(
                `${origin}/read-file-sync?filename=write-file-sync.txt`
            );
            const responseText = await response.text();

            expect(responseText).toBe('write file sync');
        });

        it('executes `fs.readFile` from a canister', async () => {
            const response = await fetch(
                `${origin}/read-file?filename=write-file.txt`
            );
            const responseText = await response.text();

            expect(responseText).toBe('write file');
        });

        it('executes `fs.mkdirSync` from a canister', async () => {
            const response = await fetch(
                `${origin}/mkdir-sync?dirname=public_sync`,
                {
                    method: 'POST'
                }
            );
            const responseText = await response.text();

            expect(responseText).toBe('Directory public_sync created');
        });

        it('executes `fs.mkdir` from a canister', async () => {
            const response = await fetch(
                `${origin}/mkdir?dirname=just_public`,
                {
                    method: 'POST'
                }
            );
            const responseText = await response.text();

            expect(responseText).toBe('Directory just_public created');
        });

        it('executes `fs.existsSync` on a dir that exists on a canister', async () => {
            const response = await fetch(
                `${origin}/exists-sync?name=public_sync`
            );
            const responseText = await response.text();

            expect(responseText).toBe('true');
        });

        it('executes `fs.existsSync` on a dir that exists on a canister', async () => {
            const response = await fetch(
                `${origin}/exists-sync?name=just_public`
            );
            const responseText = await response.text();

            expect(responseText).toBe('true');
        });

        it('executes `fs.unlinkSync` from a canister', async () => {
            const response = await fetch(
                `${origin}/unlink-sync?filename=write-file-sync.txt`,
                {
                    method: 'POST'
                }
            );
            const responseText = await response.text();

            expect(responseText).toBe('File write-file-sync.txt deleted');
        });

        it('executes `fs.unlink` from a canister', async () => {
            const response = await fetch(
                `${origin}/unlink?filename=write-file.txt`,
                {
                    method: 'POST'
                }
            );
            const responseText = await response.text();

            expect(responseText).toBe('File write-file.txt deleted');
        });

        it('executes `fs.rmdirSync` from a canister', async () => {
            const response = await fetch(
                `${origin}/rmdir-sync?dirname=public_sync`,
                {
                    method: 'POST'
                }
            );
            const responseText = await response.text();

            expect(responseText).toBe('Directory public_sync deleted');
        });

        it('executes `fs.rmdir` from a canister', async () => {
            const response = await fetch(
                `${origin}/rmdir?dirname=just_public`,
                {
                    method: 'POST'
                }
            );
            const responseText = await response.text();

            expect(responseText).toBe('Directory just_public deleted');
        });

        it('executes `fs.existsSync` on a dir that no longer exists on a canister', async () => {
            const response = await fetch(
                `${origin}/exists-sync?name=public_sync`
            );
            const responseText = await response.text();

            expect(responseText).toBe('false');
        });

        it('executes `fs.existsSync` on a dir that no longer exists on a canister', async () => {
            const response = await fetch(
                `${origin}/exists-sync?name=just_public`
            );
            const responseText = await response.text();

            expect(responseText).toBe('false');
        });

        it('executes `fs.existsSync` on a file that no longer exists on a canister', async () => {
            const response = await fetch(
                `${origin}/exists-sync?name=write-file-sync.txt`
            );
            const responseText = await response.text();

            expect(responseText).toBe('false');
        });

        it('executes `fs.existsSync` on a file that no longer exists on a canister', async () => {
            const response = await fetch(
                `${origin}/exists-sync?name=write-file.txt`
            );
            const responseText = await response.text();

            expect(responseText).toBe('false');
        });

        it('executes `fs.createReadStream` on a canister for a file at the high water mark boundary', async () => {
            const response = await fetch(`${origin}/high-water-mark-boundary`);
            const responseText = await response.text();

            expect(responseText).toBe('1');
        });

        it('executes `fs.createReadStream` on a canister for a chunked file larger than high water mark', async () => {
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

            expect(digestReadStream).toBe(digestFile);
        });

        it('executes `fs.createReadStream` on a canister for a file larger than high water mark', async () => {
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

            expect(digestReadStream).toBe(digestFile);
        });
    };
}
