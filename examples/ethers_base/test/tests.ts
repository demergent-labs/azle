// TODO These tests must be from from dfx --start to generate fresh addresses

// If 0x9Ac70EE21bE697173b74aF64399d850038697FD3 ever runs out of Base ETH or USDC,
// just use a faucet like https://www.ethereum-ecosystem.com/faucets/base-sepolia to get some more
// We should be good for a few hundred tests

import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { jsonParse } from 'azle';
import { expect, it, Test, wait } from 'azle/test/jest';

let callerAddress: string;
let canisterAddress: string;

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it("gets the caller's address using ethers and ThresholdWallet", async () => {
            const response = await fetch(`${origin}/caller-address`, {
                method: 'POST'
            });
            const responseText = await response.text();

            callerAddress = responseText;

            expect(responseText).toMatch('0x');
            expect(responseText).toHaveLength(42);
        });

        it("gets the canister's address using ethers and ThresholdWallet", async () => {
            const response = await fetch(`${origin}/canister-address`, {
                method: 'POST'
            });
            const responseText = await response.text();

            canisterAddress = responseText;

            expect(responseText).toMatch('0x');
            expect(responseText).toHaveLength(42);
            expect(responseText).not.toBe(callerAddress);
        });

        it("gets the caller's balance using ethers and ThresholdWallet", async () => {
            const response = await fetch(`${origin}/address-balance`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    address: callerAddress
                })
            });
            const responseJson = jsonParse(await response.text());

            expect(responseJson).toBe(0n);
        });

        it("gets the canister's balance using ethers and ThresholdWallet", async () => {
            const response = await fetch(`${origin}/address-balance`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    address: canisterAddress
                })
            });
            const responseJson = jsonParse(await response.text());

            expect(responseJson).toBe(0n);
        });

        it('transfers from the sepolia faucet wallet to the canister wallet using ethers', async () => {
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

            expect(responseText).toMatch('transaction sent with hash:');
        });

        wait('for funds to be available', 30_000);

        it("gets the canister's balance after transfer from faucet using ethers and ThresholdWallet", async () => {
            const response = await fetch(`${origin}/address-balance`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    address: canisterAddress
                })
            });
            const responseJson = jsonParse(await response.text());

            expect(responseJson).toBe(100_000_000_000_000n);
        });

        it("transfer from the canister to the caller's wallet using ethers", async () => {
            const response = await fetch(`${origin}/transfer-from-canister`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    to: callerAddress,
                    value: '.000000000000000007'
                })
            });
            const responseText = await response.text();

            expect(responseText).toMatch('transaction sent with hash:');
        });

        it("gets the canister's balance after the transfer using ethers and ThresholdWallet", async () => {
            const response = await fetch(`${origin}/address-balance`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    address: canisterAddress
                })
            });
            const responseJson = jsonParse(await response.text());

            expect(responseJson).toBeLessThan(100_000_000_000_000n);
            expect(responseJson).toBeGreaterThan(0n);
        });

        it("gets the caller's balance after the transfer using ethers and ThresholdWallet", async () => {
            const response = await fetch(`${origin}/address-balance`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    address: callerAddress
                })
            });
            const responseJson = jsonParse(await response.text());

            expect(responseJson).toBe(7n);
        });
    };
}
