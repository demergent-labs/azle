import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { expect, it, Test } from 'azle/test/jest';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('reads a file in the top level directory', async () => {
            const response = await fetch(
                `${origin}/read-test0?filename=${'assets/test0.txt'}`
            );
            const responseText = await response.text();

            expect(responseText.trim()).toBe('test0');
        });

        it('reads a file in a child directory', async () => {
            const response = await fetch(`${origin}/read-test2`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    filename: 'assets/test1/test2.txt'
                })
            });
            const responseText = await response.text();

            expect(responseText.trim()).toBe('test2');
        });
        it('reads a sibling file', async () => {
            const response = await fetch(`${origin}/read-test3`, {
                method: 'PUT',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    filename: 'assets/test1/test3.txt'
                })
            });
            const responseText = await response.text();

            expect(responseText.trim()).toBe('test3');
        });
        it('reads in a file in a grandchild directory', async () => {
            const response = await fetch(`${origin}/read-test5`, {
                method: 'PATCH',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    filename: 'assets/test1/test4/test5.txt'
                })
            });
            const responseText = await response.text();

            expect(responseText.trim()).toBe('test5');
        });
    };
}
