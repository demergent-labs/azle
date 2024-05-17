import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { getCanisterId } from 'azle/dfx';
import { whileRunningBitcoinDaemon } from 'azle/examples/basic_bitcoin/test/bitcoin-daemon';
import { getTests } from 'azle/examples/basic_bitcoin/test/tests';
import { runTests } from 'azle/test';

export const P2WPKH_ADDRESS_FORM =
    'bcrt1qcxzt0xpf8qe3q75rsd30thrhgwzddy85f0cu4w';

export async function getP2wpkhAddress(origin: string): Promise<string> {
    const response = await fetch(`${origin}/get-p2wpkh-address`, {
        headers: [['X-Ic-Force-Update', 'true']]
    });
    return await response.text();
}

const canisterId = getCanisterId('bitcoin_psbt');

whileRunningBitcoinDaemon(() =>
    runTests(getTests(canisterId, getP2wpkhAddress, P2WPKH_ADDRESS_FORM))
);
