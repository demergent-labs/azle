import { experimentalMessage } from '../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

import { ic } from './';

export async function chunk(): Promise<void> {
    if (globalThis._azleIc === undefined) {
        return undefined;
    }

    await ic.callRaw(ic.id(), '_azle_chunk', ic.candidEncode('()'), 0n);
}
