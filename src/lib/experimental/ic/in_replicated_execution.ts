import '../experimental';

import { bool } from '../candid/types/primitive/bool';

export function inReplicatedExecution(): bool {
    if (globalThis._azleIcExperimental === undefined) {
        return false;
    }

    return globalThis._azleIcExperimental.inReplicatedExecution();
}
