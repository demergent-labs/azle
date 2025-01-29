import { call, IDL, onLowWasmMemory, query, update } from 'azle';

export default class MemoryManagementCanister {
    storedBytes: Uint8Array = new Uint8Array(0);
    hasLowMemoryHandlerBeenCalled: boolean = false;

    @onLowWasmMemory
    onLowWasmMemory(): void {
        this.hasLowMemoryHandlerBeenCalled = true;
        this.storedBytes = new Uint8Array(0);
    }

    @query([], IDL.Bool)
    wasLowMemoryHandlerCalled(): boolean {
        return this.hasLowMemoryHandlerBeenCalled;
    }

    @update([], IDL.Vec(IDL.Nat8))
    clearBytes(): Uint8Array {
        this.storedBytes = new Uint8Array(0);
        return new Uint8Array(this.storedBytes);
    }

    @query([], IDL.Nat32)
    getStoredByteCount(): number {
        return this.storedBytes.length;
    }

    @update([IDL.Nat32])
    async addRandomBytes(bytesToAdd: number): Promise<void> {
        const randomBytes = await fetchRandomBytesFromIC();
        const expandedBytes = expandRandomBytes(randomBytes, bytesToAdd);

        const newBuffer = new Uint8Array(
            this.storedBytes.length + expandedBytes.length
        );
        newBuffer.set(this.storedBytes);
        newBuffer.set(expandedBytes, this.storedBytes.length);
        this.storedBytes = newBuffer;
    }
}

/**
 * Fetches random bytes from the Internet Computer's random number generator
 *
 * @returns Promise resolving to a Uint8Array of random bytes
 */
async function fetchRandomBytesFromIC(): Promise<Uint8Array> {
    return await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
        returnIdlType: IDL.Vec(IDL.Nat8)
    });
}

/**
 * Expands a small array of random bytes into a larger array by repeating the pattern
 *
 * @param sourceBytes - Original random bytes to expand
 * @param targetSize - Desired size of the expanded array
 * @returns Expanded Uint8Array
 */
function expandRandomBytes(
    sourceBytes: Uint8Array,
    targetSize: number
): Uint8Array {
    const expandedBytes = new Uint8Array(targetSize);
    const iterations = Math.floor(targetSize / sourceBytes.length);

    for (let i = 0; i < iterations; i++) {
        expandedBytes.set(sourceBytes, i * sourceBytes.length);
    }

    return expandedBytes;
}
