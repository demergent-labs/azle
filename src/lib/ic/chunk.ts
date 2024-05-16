import { ic } from './';

export async function chunk(): Promise<void> {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    try {
        await ic.callRaw(ic.id(), '_azle_chunk', ic.candidEncode('()'), 0n);
    } catch (error) {
        console.log('error', error);
    }
}
