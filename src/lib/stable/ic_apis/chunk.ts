import { callRaw } from './call_raw';
import { candidEncode } from './candid_encode';
import { id } from './id';

export async function chunk(): Promise<void> {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    await callRaw(id(), '_azle_chunk', candidEncode('()'), 0n);
}
