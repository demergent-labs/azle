async function abortableUploadFileChunk(
    name: string,
    fileChunk: Uint8Array,
    signal: AbortSignal
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal.aborted) {
            console.log(`Aborting ${name}.${fileChunk} before starting`);
            return reject(new Error('Aborted'));
        }

        console.log(`Start uploading: ${name}.${fileChunk}`);

        // Simulate upload
        _azle_upload_file_chunk(name, fileChunk);

        console.log(`Finish uploading: ${name}.${fileChunk}`);

        // const onAbort = (): void => {
        //     console.log(`Aborting ${name}.${fileChunk} because of abortion`);
        //     reject(new Error('Aborted'));
        // };

        // // Listen for abort event
        // signal.addEventListener('abort', onAbort);

        // resolve().finally(() => {
        //     console.log('Hello from the finally');
        //     signal.removeEventListener('abort', onAbort);
        // });
        resolve();
    });
}

// Simulated API endpoint (I don't control anything that happens here and I can't cancel this part once it starts)
async function _azle_upload_file_chunk(
    name: string,
    fileChunk: Uint8Array
): Promise<void> {
    // Note: All of the output from here should be considered as if it was on the canister and in the replica logs
    replicaLog(`Start uploading: ${name}.${fileChunk}`);

    await new Promise((resolve, reject) => {
        // Simulate upload
        setTimeout(() => {
            // Simulate success or failure
            const isSuccess = Math.random() > 0.2;
            if (isSuccess) {
                resolve(true);
            } else {
                reject(new Error(`Upload failed: ${name}.${fileChunk}`));
            }
        }, 5_000);
    });
    replicaLog(`Finish uploading: ${name}.${fileChunk}`);
}

async function throttle(): Promise<void> {
    // We can only process about 4Mib per second. So if chunks are about
    // 2 MiB or less then we can only send off two per second.
    if (process.env.DFX_NETWORK === 'ic') {
        await new Promise((resolve) => setTimeout(resolve, 2_000)); // Mainnet requires more throttling. We found 2_000 by trial and error
    } else {
        await new Promise((resolve) => setTimeout(resolve, 2_000)); // Should be 500 (ie 1 every 1/2 second or 2 every second)
    }
}

function replicaLog(message: string): void {
    console.log('\x1b[32m%s\x1b[0m', message);
}

async function cleanUp(destPath: string): Promise<void> {
    console.log(`Cleaning up ${destPath}...`);
    // Simulate clean up
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Clean up complete.');
}

async function uploadFile(
    fileChunks: Uint8Array[],
    destPath: string
): Promise<void> {
    const controller = new AbortController();
    const { signal } = controller;

    let uploadPromises: Promise<void>[] = [];
    let index = 0;

    for (const chunk of fileChunks) {
        console.log(`before throttle: ${destPath}.${chunk}`);
        await throttle();
        console.log(`after throttle: ${destPath}.${chunk}`);
        const result = abortableUploadFileChunk(destPath, chunk, signal)
            .then(() => console.log(`Hello world from chunk ${index++}`))
            .finally(() => console.log('hello from file finally'));

        uploadPromises.push(result);
    }

    return Promise.all(uploadPromises)
        .then(() => console.log('All files uploaded like this cool thing')) // TODO obviously not
        .catch(async (error) => {
            console.error('An error occurred but we caught it:', error);
            controller.abort(); // Abort remaining promises
            await cleanUp(destPath);
        });
}

// Example usage
const fileChunks = [
    new Uint8Array([0]),
    new Uint8Array([1]),
    new Uint8Array([2]),
    new Uint8Array([3]),
    new Uint8Array([4]),
    new Uint8Array([5]),
    new Uint8Array([6]),
    new Uint8Array([7])
    // new Uint8Array([8]),
    // new Uint8Array([9]),
    // new Uint8Array([10]),
    // new Uint8Array([11]),
    // new Uint8Array([12]),
    // new Uint8Array([13]),
    // new Uint8Array([14]),
    // new Uint8Array([15])
];

const files = ['cool.txt', 'boy.txt', 'monkey.txt', 'pup.txt', 'dog.txt'];
// const files = ['cool.txt'];

async function uploadFiles(): Promise<void> {
    for (const item of files) {
        await uploadFile(fileChunks, item);
    }
}

uploadFiles();
