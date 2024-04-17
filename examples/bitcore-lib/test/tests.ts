import { Test } from 'azle/test';

import { getBitcoinTests } from './bitcoin';

export function getTests(canisterId: string): Test[] {
    return getBitcoinTests(canisterId);
}
