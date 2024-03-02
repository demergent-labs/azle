// TODO tests have not been updated since the project was materially changed

import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/eth_feeHistory',
            skip: true,
            test: async () => {
                const response = await fetch(`${origin}/eth_feeHistory`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText.startsWith('{"Consistent":{"Ok"')
                };
            }
        }
    ];
}
