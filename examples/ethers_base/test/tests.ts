// TODO These tests must be from from dfx --start to generate fresh addresses

// If 0x9Ac70EE21bE697173b74aF64399d850038697FD3 ever runs out of Base ETH or USDC,
// just use a faucet like https://www.ethereum-ecosystem.com/faucets/base-sepolia to get some more
// We should be good for a few hundred tests

import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

let callerAddress: string;
let canisterAddress: string;

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/caller-address',
            test: async () => {
                const response = await fetch(`${origin}/caller-address`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                callerAddress = responseText;

                return {
                    Ok:
                        responseText.startsWith('0x') &&
                        responseText.length === 42
                };
            }
        },
        {
            name: '/canister-address',
            test: async () => {
                const response = await fetch(`${origin}/canister-address`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                canisterAddress = responseText;

                return {
                    Ok:
                        responseText.startsWith('0x') &&
                        responseText.length === 42 &&
                        callerAddress !== canisterAddress
                };
            }
        },
        {
            name: '/address-balance caller',
            test: async () => {
                const response = await fetch(`${origin}/address-balance`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        address: callerAddress
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok: BigInt(responseJson.__bigint__) === 0n
                };
            }
        },
        {
            name: '/address-balance canister',
            test: async () => {
                const response = await fetch(`${origin}/address-balance`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        address: canisterAddress
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok: BigInt(responseJson.__bigint__) === 0n
                };
            }
        },
        {
            name: '/transfer-from-sepolia-faucet-wallet to canister wallet',
            test: async () => {
                const response = await fetch(
                    `${origin}/transfer-from-sepolia-faucet-wallet`,
                    {
                        method: 'POST',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            to: canisterAddress,
                            value: '.0001'
                        })
                    }
                );
                const responseText = await response.text();

                return {
                    Ok: responseText.startsWith('transaction sent with hash:')
                };
            }
        },
        {
            name: '/address-balance canister',
            test: async () => {
                const response = await fetch(`${origin}/address-balance`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        address: canisterAddress
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok: BigInt(responseJson.__bigint__) === 100_000_000_000_000n
                };
            }
        },
        {
            name: '/transfer-from-canister to caller wallet',
            test: async () => {
                const response = await fetch(
                    `${origin}/transfer-from-canister`,
                    {
                        method: 'POST',
                        headers: [['Content-Type', 'application/json']],
                        body: JSON.stringify({
                            to: callerAddress,
                            value: '.000000000000000007'
                        })
                    }
                );
                const responseText = await response.text();

                return {
                    Ok: responseText.startsWith('transaction sent with hash:')
                };
            }
        },
        {
            name: '/address-balance canister',
            test: async () => {
                const response = await fetch(`${origin}/address-balance`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        address: canisterAddress
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok: BigInt(responseJson.__bigint__) < 100_000_000_000_000n
                };
            }
        },
        {
            name: '/address-balance caller',
            test: async () => {
                const response = await fetch(`${origin}/address-balance`, {
                    method: 'POST',
                    headers: [['Content-Type', 'application/json']],
                    body: JSON.stringify({
                        address: callerAddress
                    })
                });
                const responseJson = await response.json();

                return {
                    Ok: BigInt(responseJson.__bigint__) === 7n
                };
            }
        }
    ];
}
