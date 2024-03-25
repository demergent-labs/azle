import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

type Header = [string, string];

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/fetch-head',
            test: async () => {
                const response = await fetch(`${origin}/fetch-head`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                const headerIsCorrectContentLength = isHeaderCorrect(
                    responseJson,
                    'content-length',
                    '480'
                );
                const headerIsCorrectXPoweredBy = isHeaderCorrect(
                    responseJson,
                    'x-powered-by',
                    'Express'
                );
                const headerIsCorrectServer = isHeaderCorrect(
                    responseJson,
                    'server',
                    'Cowboy'
                );
                const headerIsCorrectConnection = isHeaderCorrect(
                    responseJson,
                    'connection',
                    'keep-alive'
                );
                const headerIsCorrectContentType = isHeaderCorrect(
                    responseJson,
                    'content-type',
                    'application/json; charset=utf-8'
                );
                const headerIsCorrectAccessControlAllowOrigin = isHeaderCorrect(
                    responseJson,
                    'access-control-allow-origin',
                    '*'
                );

                return {
                    Ok:
                        headerIsCorrectContentLength &&
                        headerIsCorrectXPoweredBy &&
                        headerIsCorrectServer &&
                        headerIsCorrectConnection &&
                        headerIsCorrectContentType &&
                        headerIsCorrectAccessControlAllowOrigin
                };
            }
        },
        {
            name: '/fetch-get',
            test: async () => {
                const response = await fetch(`${origin}/fetch-get`, {
                    method: 'POST'
                });
                const { headers, body } = await response.json();

                const headerIsCorrectContentLength = isHeaderCorrect(
                    headers,
                    'content-length',
                    '480'
                );
                const headerIsCorrectXPoweredBy = isHeaderCorrect(
                    headers,
                    'x-powered-by',
                    'Express'
                );
                const headerIsCorrectServer = isHeaderCorrect(
                    headers,
                    'server',
                    'Cowboy'
                );
                const headerIsCorrectConnection = isHeaderCorrect(
                    headers,
                    'connection',
                    'keep-alive'
                );
                const headerIsCorrectContentType = isHeaderCorrect(
                    headers,
                    'content-type',
                    'application/json; charset=utf-8'
                );
                const headerIsCorrectAccessControlAllowOrigin = isHeaderCorrect(
                    headers,
                    'access-control-allow-origin',
                    '*'
                );

                return {
                    Ok:
                        headerIsCorrectContentLength &&
                        headerIsCorrectXPoweredBy &&
                        headerIsCorrectServer &&
                        headerIsCorrectConnection &&
                        headerIsCorrectContentType &&
                        headerIsCorrectAccessControlAllowOrigin &&
                        body.status.verified === true &&
                        body.status.sentCount === 1 &&
                        body._id === '591f989cd369931519ce361d' &&
                        body.text ===
                            'In ancient Egypt, killing a cat was a crime punishable by death.' &&
                        body.source === 'api' &&
                        body.type === 'cat' &&
                        body.createdAt === '2018-01-04T01:10:54.673Z'
                };
            }
        },
        {
            name: '/fetch-get-query-params',
            test: async () => {
                const response = await fetch(
                    `${origin}/fetch-get-query-params`,
                    {
                        method: 'POST'
                    }
                );
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.length === 2 &&
                        responseJson[0].type === 'cat' &&
                        responseJson[1].type === 'cat'
                };
            }
        },
        {
            name: '/fetch-post',
            test: async () => {
                const response = await fetch(`${origin}/fetch-post`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson.result === '0x9ad9e69f9d47520000'
                };
            }
        },
        {
            name: '/request-headers',
            test: async () => {
                const response = await fetch(`${origin}/request-headers`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.headers['X-Azle-Request-Key-0'] ===
                            'X-Azle-Request-Value-0' &&
                        responseJson.headers['X-Azle-Request-Key-1'] ===
                            'X-Azle-Request-Value-1' &&
                        responseJson.headers['X-Azle-Request-Key-2'] ===
                            'X-Azle-Request-Value-2'
                };
            }
        },
        {
            name: '/get-status-201',
            test: async () => {
                const response = await fetch(`${origin}/get-status-201`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.status === 201 &&
                        responseJson.statusText === 'Created'
                };
            }
        },
        {
            name: '/get-status-205',
            test: async () => {
                const response = await fetch(`${origin}/get-status-205`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.status === 205 &&
                        responseJson.statusText === 'Reset Content'
                };
            }
        },
        {
            name: '/get-status-301',
            test: async () => {
                const response = await fetch(`${origin}/get-status-301`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.status === 301 &&
                        responseJson.statusText === 'Moved Permanently'
                };
            }
        },
        {
            name: '/get-status-304',
            test: async () => {
                const response = await fetch(`${origin}/get-status-304`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.status === 304 &&
                        responseJson.statusText === 'Not Modified'
                };
            }
        },
        {
            name: '/get-status-401',
            test: async () => {
                const response = await fetch(`${origin}/get-status-401`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.status === 401 &&
                        responseJson.statusText === 'Unauthorized'
                };
            }
        },
        {
            name: '/get-status-418',
            test: async () => {
                const response = await fetch(`${origin}/get-status-418`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.status === 418 &&
                        responseJson.statusText === "I'm a teapot"
                };
            }
        },
        {
            name: '/get-status-500',
            test: async () => {
                const response = await fetch(`${origin}/get-status-500`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.status === 500 &&
                        responseJson.statusText === 'Internal Server Error'
                };
            }
        },
        {
            name: '/get-status-501',
            test: async () => {
                const response = await fetch(`${origin}/get-status-501`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok:
                        responseJson.status === 501 &&
                        responseJson.statusText === 'Not Implemented'
                };
            }
        },
        {
            name: '/transform',
            test: async () => {
                const response = await fetch(`${origin}/transform`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson.length === 0
                };
            }
        },
        {
            name: '/transform-with-context',
            test: async () => {
                const response = await fetch(
                    `${origin}/transform-with-context`,
                    {
                        method: 'POST'
                    }
                );
                const { headers, body } = await response.json();

                return {
                    Ok: headers.length === 0 && body === 3
                };
            }
        },
        {
            name: '/max-response-bytes',
            test: async () => {
                const response = await fetch(`${origin}/max-response-bytes`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson.message.includes(
                        'Header size exceeds specified response size limit 0'
                    )
                };
            }
        },
        {
            name: '/cycles',
            test: async () => {
                const response = await fetch(`${origin}/cycles`, {
                    method: 'POST'
                });
                const responseJson = await response.json();

                return {
                    Ok: responseJson.message.includes(
                        'http_request request sent with 0 cycles'
                    )
                };
            }
        }
    ];
}

function isHeaderCorrect(
    headers: Header[],
    keyCorrect: string,
    valueCorrect: string
): boolean {
    return (
        headers.find(
            ([key, value]) =>
                key.toLowerCase() === keyCorrect && value === valueCorrect
        ) !== undefined
    );
}
