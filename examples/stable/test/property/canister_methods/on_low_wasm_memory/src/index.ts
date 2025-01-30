import { call, IDL, onLowWasmMemory, query, update } from 'azle';

export default class {
    storedBytes: Uint8Array = new Uint8Array();
    onLowWasmMemoryCalled: boolean = false;

    @onLowWasmMemory
    onLowWasmMemory(): void {
        this.onLowWasmMemoryCalled = true;
    }

    @query([], IDL.Bool)
    getOnLowWasmMemoryCalled(): boolean {
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
 * Fetches random bytes from the IC and repeats them to the desired size
 *
 * @param size - Size of the resulting array
 * @returns An array of random bytes
 */
async function fetchRandomBytes(size: number): Promise<Uint8Array> {
    const randomBytes = await call<undefined, Uint8Array>(
        'aaaaa-aa',
        'raw_rand',
        {
            returnIdlType: IDL.Vec(IDL.Nat8)
        }
    );

    let result = new Uint8Array(size);
    const repeats = Math.floor(size / randomBytes.length);

    for (let i = 0; i < repeats; i++) {
        result.set(randomBytes, i * randomBytes.length);
    }

    return result;
}
