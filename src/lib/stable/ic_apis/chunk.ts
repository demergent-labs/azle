import { call } from './call';
import { candidEncode } from './candid_encode';
import { id } from './id';

export async function chunk(): Promise<void> {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    await call(id(), '_azle_chunk', { raw: candidEncode('()'), payment: 0n });
}
