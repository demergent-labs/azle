import { expect, it, Test } from 'azle/test';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('fetches using the head method', async () => {
            const response = await fetch(`${origin}/fetch-head`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            expect(responseJson).toContainEqual(['content-length', '480']);
            expect(responseJson).toContainEqual(['x-powered-by', 'Express']);
            expect(responseJson).toContainEqual(['server', 'Cowboy']);
            expect(responseJson).toContainEqual(['connection', 'keep-alive']);
            expect(responseJson).toContainEqual([
                'content-type',
                'application/json; charset=utf-8'
            ]);
            expect(responseJson).toContainEqual([
                'access-control-allow-origin',
                '*'
            ]);
        }, 10_000);

        it('fetches using the get method', async () => {
            const response = await fetch(`${origin}/fetch-get`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const { headers, body } = await response.json();

            expect(headers).toContainEqual(['content-length', '480']);
            expect(headers).toContainEqual(['x-powered-by', 'Express']);
            expect(headers).toContainEqual(['server', 'Cowboy']);
            expect(headers).toContainEqual(['connection', 'keep-alive']);
            expect(headers).toContainEqual([
                'content-type',
                'application/json; charset=utf-8'
            ]);
            expect(headers).toContainEqual([
                'access-control-allow-origin',
                '*'
            ]);

            const expectedBody = {
                status: {
                    verified: true,
                    sentCount: 1
                },
                _id: '591f989cd369931519ce361d',
                text: 'In ancient Egypt, killing a cat was a crime punishable by death.',
                source: 'api',
                type: 'cat',
                createdAt: '2018-01-04T01:10:54.673Z'
            };

            expect(body).toEqual(expect.objectContaining(expectedBody));
        }, 10_000);

        it('fetches using the get method and query params', async () => {
            const response = await fetch(`${origin}/fetch-get-query-params`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            const expectedResponse = {
                type: 'cat'
            };

            expect(responseJson).toHaveLength(2);

            for (const cat of responseJson) {
                expect(cat).toEqual(expect.objectContaining(expectedResponse));
            }
        }, 10_000);

        it('fetches using the post method', async () => {
            const response = await fetch(`${origin}/fetch-post`, {
                method: 'POST'
            });
            const responseJson = await response.json();

            expect(responseJson.result).toBe('0x9ad9e69f9d47520000');
        }, 10_000);

        it('fetches using the get method and headers', async () => {
            const response = await fetch(`${origin}/request-headers`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            const expectedHeaders = {
                'X-Azle-Request-Key-0': 'X-Azle-Request-Value-0',
                'X-Azle-Request-Key-1': 'X-Azle-Request-Value-1',
                'X-Azle-Request-Key-2': 'X-Azle-Request-Value-2'
            };

            expect(responseJson.headers).toEqual(
                expect.objectContaining(expectedHeaders)
            );
        }, 10_000);

        it('handles status 201', async () => {
            const response = await fetch(`${origin}/get-status-201`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            expect(responseJson.status).toBe(201);
            expect(responseJson.statusText).toBe('Created');
        }, 10_000);

        it('handles status 205', async () => {
            const response = await fetch(`${origin}/get-status-205`, {
                method: 'POST'
            });
            const responseJson = await response.json();

            expect(responseJson.status).toBe(205);
            expect(responseJson.statusText).toBe('Reset Content');
        }, 10_000);

        it('handles status 301', async () => {
            const response = await fetch(`${origin}/get-status-301`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            expect(responseJson.status).toBe(301);
            expect(responseJson.statusText).toBe('Moved Permanently');
        }, 10_000);

        it('handles status 304', async () => {
            const response = await fetch(`${origin}/get-status-304`, {
                method: 'POST'
            });
            const responseJson = await response.json();

            expect(responseJson.status).toBe(304);
            expect(responseJson.statusText).toBe('Not Modified');
        }, 10_000);

        it('handles status 401', async () => {
            const response = await fetch(`${origin}/get-status-401`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            expect(responseJson.status).toBe(401);
            expect(responseJson.statusText).toBe('Unauthorized');
        }, 10_000);

        it('handles status 418', async () => {
            const response = await fetch(`${origin}/get-status-418`, {
                method: 'POST'
            });
            const responseJson = await response.json();

            expect(responseJson.status).toBe(418);
            expect(responseJson.statusText).toBe("I'm a teapot");
        }, 10_000);

        it('handles status 500', async () => {
            const response = await fetch(`${origin}/get-status-500`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            expect(responseJson.status).toBe(500);
            expect(responseJson.statusText).toBe('Internal Server Error');
        }, 10_000);

        it('handles status 501', async () => {
            const response = await fetch(`${origin}/get-status-501`, {
                method: 'POST'
            });
            const responseJson = await response.json();

            expect(responseJson.status).toBe(501);
            expect(responseJson.statusText).toBe('Not Implemented');
        }, 10_000);

        it('transforms the http response', async () => {
            const response = await fetch(`${origin}/transform`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            expect(responseJson).toHaveLength(0);
        }, 10_000);

        it('transforms the http response with context', async () => {
            const response = await fetch(`${origin}/transform-with-context`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const { headers, body } = await response.json();

            expect(headers).toHaveLength(0);
            expect(body).toBe(3);
        }, 10_000);

        it('fails to fetch if the response is larger than the specified max response bytes', async () => {
            const response = await fetch(`${origin}/max-response-bytes`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            expect(responseJson).toEqual({
                message:
                    'Rejection code 1, Header size exceeds specified response size limit 0'
            });
        }, 10_000);

        it('fails to fetch if the request has no cycles attached to it', async () => {
            const response = await fetch(`${origin}/cycles`, {
                headers: [['X-Ic-Force-Update', 'true']]
            });
            const responseJson = await response.json();

            expect(responseJson.message).toMatch(
                /Rejection code 4, http_request request sent with 0 cycles, but \d{1,3}(_\d{3})* cycles are required\./
            );
        });
    };
}
