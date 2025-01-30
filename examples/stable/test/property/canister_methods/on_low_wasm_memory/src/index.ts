import { call, IDL, onLowWasmMemory, query, update } from 'azle';

export default class {
    storedBytes: Uint8Array = new Uint8Array();
    onLowWasmMemoryCalled: boolean = false;

    @onLowWasmMemory
    onLowWasmMemory(): void {
        this.onLowWasmMemoryCalled = true;
    }

    @query([], IDL.Bool)
    getOnLowWasMemoryCalled(): boolean {
        return this.onLowWasmMemoryCalled;
    }

    @update([IDL.Nat32])
    async addRandomBytes(numberOfBytesToAdd: number): Promise<void> {
        const randomBytes = await fetchRandomBytes(numberOfBytesToAdd);

        let newBuffer = new Uint8Array(
            this.storedBytes.length + randomBytes.length
        );
        newBuffer.set(this.storedBytes);
        newBuffer.set(randomBytes, this.storedBytes.length);
        this.storedBytes = newBuffer;
    }
}

/**
 * Expands a small array of random bytes into a larger array by repeating the pattern
 *
 * @param sourceBytes - Original random bytes to expand
 * @param targetSize - Desired size of the expanded array
 * @returns Expanded bytes
 */
async function fetchRandomBytes(targetSize: number): Promise<Uint8Array> {
    const randomBytes = await call<undefined, Uint8Array>(
        'aaaaa-aa',
        'raw_rand',
        {
            returnIdlType: IDL.Vec(IDL.Nat8)
        }
    );
    let expandedBytes = new Uint8Array(targetSize);
    const iterations = Math.floor(targetSize / randomBytes.length);

    for (let i = 0; i < iterations; i++) {
        expandedBytes.set(randomBytes, i * randomBytes.length);
    }

    return expandedBytes;
}
