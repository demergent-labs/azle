import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

import { getBitcoinTests } from './bitcoin';

export function getTests(canisterId: string): Test[] {
    return [...getBitcoinTests(canisterId)];
}
