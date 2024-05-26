import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test, testEquality } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: 'app get',
            test: async () => {
                const response = await fetch(`${origin}/get`);
                const responseText = await response.text();

                return testEquality(responseText, 'get');
            }
        },
        {
            name: 'app post',
            test: async () => {
                const response = await fetch(`${origin}/post`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'post');
            }
        },
        {
            name: 'app put',
            test: async () => {
                const response = await fetch(`${origin}/put`, {
                    method: 'PUT'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'put');
            }
        },
        {
            name: 'app patch',
            test: async () => {
                const response = await fetch(`${origin}/patch`, {
                    method: 'PATCH'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'patch');
            }
        },
        {
            name: 'app delete',
            test: async () => {
                const response = await fetch(`${origin}/delete`, {
                    method: 'DELETE'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'delete');
            }
        },
        {
            name: 'app json',
            test: async () => {
                const response = await fetch(`${origin}/json`);
                const responseJson = await response.json();
                const expected = {
                    hello: 'AppJson'
                };

                return testEquality(responseJson, expected);
            }
        },
        {
            name: 'app header',
            test: async () => {
                const response = await fetch(`${origin}/header`, {
                    headers: [['X-App-Header-Key', 'AppHeaderValue']]
                });
                const responseText = await response.text();

                return testEquality(responseText, 'AppHeaderValue');
            }
        },
        {
            name: 'app http-code',
            test: async () => {
                const response = await fetch(`${origin}/http-code`);
                const responseText = await response.text();

                return testEquality(
                    [response.status, response.statusText, responseText],
                    [418, `I'm a teapot`, `App I'm a teapot`]
                );
            }
        },
        {
            name: 'app query',
            test: async () => {
                const response = await fetch(`${origin}/query?hello=AppQuery`);
                const responseText = await response.text();

                return testEquality(responseText, 'AppQuery');
            }
        },
        {
            name: 'app body',
            test: async () => {
                const response = await fetch(`${origin}/body`, {
                    method: 'POST',
                    headers: [['Content-Type', 'Application/Json']],
                    body: JSON.stringify({
                        hello: 'AppBody'
                    })
                });
                const responseText = await response.text();

                return testEquality(responseText, 'AppBody');
            }
        },
        {
            name: 'app express-request',
            test: async () => {
                const response = await fetch(
                    `${origin}/express-request?hello=AppExpressRequest`
                );
                const responseText = await response.text();

                return testEquality(responseText, 'AppExpressRequest');
            }
        },
        {
            name: 'app express-response',
            test: async () => {
                const response = await fetch(`${origin}/express-response`);
                const responseText = await response.text();

                return testEquality(responseText, 'App Express Response');
            }
        },
        {
            name: 'dogs get',
            test: async () => {
                const response = await fetch(`${origin}/dogs/get`);
                const responseText = await response.text();

                return testEquality(responseText, 'dogs get');
            }
        },
        {
            name: 'dogs post',
            test: async () => {
                const response = await fetch(`${origin}/dogs/post`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'dogs post');
            }
        },
        {
            name: 'dogs put',
            test: async () => {
                const response = await fetch(`${origin}/dogs/put`, {
                    method: 'PUT'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'dogs put');
            }
        },
        {
            name: 'dogs patch',
            test: async () => {
                const response = await fetch(`${origin}/dogs/patch`, {
                    method: 'PATCH'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'dogs patch');
            }
        },
        {
            name: 'dogs delete',
            test: async () => {
                const response = await fetch(`${origin}/dogs/delete`, {
                    method: 'DELETE'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'dogs delete');
            }
        },
        {
            name: 'dogs json',
            test: async () => {
                const response = await fetch(`${origin}/dogs/json`);
                const responseJson = await response.json();
                const expected = {
                    hello: 'DogsJson'
                };

                return testEquality(responseJson, expected);
            }
        },
        {
            name: 'dogs header',
            test: async () => {
                const response = await fetch(`${origin}/dogs/header`, {
                    headers: [['X-Dogs-Header-Key', 'DogsHeaderValue']]
                });
                const responseText = await response.text();

                return testEquality(responseText, 'DogsHeaderValue');
            }
        },
        {
            name: 'dogs http-code',
            test: async () => {
                const response = await fetch(`${origin}/dogs/http-code`);
                const responseText = await response.text();

                return testEquality(
                    [response.status, response.statusText, responseText],
                    [418, `I'm a teapot`, `Dogs I'm a teapot`]
                );
            }
        },
        {
            name: 'dogs query',
            test: async () => {
                const response = await fetch(
                    `${origin}/dogs/query?hello=DogsQuery`
                );
                const responseText = await response.text();

                return testEquality(responseText, 'DogsQuery');
            }
        },
        {
            name: 'dogs body',
            test: async () => {
                const response = await fetch(`${origin}/dogs/body`, {
                    method: 'POST',
                    headers: [['Content-Type', 'Application/Json']],
                    body: JSON.stringify({
                        hello: 'DogsBody'
                    })
                });
                const responseText = await response.text();

                return testEquality(responseText, 'DogsBody');
            }
        },
        {
            name: 'dogs express-request',
            test: async () => {
                const response = await fetch(
                    `${origin}/dogs/express-request?hello=DogsExpressRequest`
                );
                const responseText = await response.text();

                return testEquality(responseText, 'DogsExpressRequest');
            }
        },
        {
            name: 'dogs express-response',
            test: async () => {
                const response = await fetch(`${origin}/dogs/express-response`);
                const responseText = await response.text();

                return testEquality(responseText, 'Dogs Express Response');
            }
        },
        {
            name: 'cats get',
            test: async () => {
                const response = await fetch(`${origin}/cats/get`);
                const responseText = await response.text();

                return testEquality(responseText, 'cats get');
            }
        },
        {
            name: 'cats post',
            test: async () => {
                const response = await fetch(`${origin}/cats/post`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'cats post');
            }
        },
        {
            name: 'cats put',
            test: async () => {
                const response = await fetch(`${origin}/cats/put`, {
                    method: 'PUT'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'cats put');
            }
        },
        {
            name: 'cats patch',
            test: async () => {
                const response = await fetch(`${origin}/cats/patch`, {
                    method: 'PATCH'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'cats patch');
            }
        },
        {
            name: 'cats delete',
            test: async () => {
                const response = await fetch(`${origin}/cats/delete`, {
                    method: 'DELETE'
                });
                const responseText = await response.text();

                return testEquality(responseText, 'cats delete');
            }
        },
        {
            name: 'cats json',
            test: async () => {
                const response = await fetch(`${origin}/cats/json`);
                const responseJson = await response.json();
                const expected = {
                    hello: 'CatsJson'
                };

                return testEquality(responseJson, expected);
            }
        },
        {
            name: 'cats header',
            test: async () => {
                const response = await fetch(`${origin}/cats/header`, {
                    headers: [['X-Cats-Header-Key', 'CatsHeaderValue']]
                });
                const responseText = await response.text();

                return testEquality(responseText, 'CatsHeaderValue');
            }
        },
        {
            name: 'cats http-code',
            test: async () => {
                const response = await fetch(`${origin}/cats/http-code`);
                const responseText = await response.text();

                return testEquality(
                    [response.status, response.statusText, responseText],
                    [418, `I'm a teapot`, `Cats I'm a teapot`]
                );
            }
        },
        {
            name: 'cats query',
            test: async () => {
                const response = await fetch(
                    `${origin}/cats/query?hello=CatsQuery`
                );
                const responseText = await response.text();

                return testEquality(responseText, 'CatsQuery');
            }
        },
        {
            name: 'cats body',
            test: async () => {
                const response = await fetch(`${origin}/cats/body`, {
                    method: 'POST',
                    headers: [['Content-Type', 'Application/Json']],
                    body: JSON.stringify({
                        hello: 'CatsBody'
                    })
                });
                const responseText = await response.text();

                return testEquality(responseText, 'CatsBody');
            }
        },
        {
            name: 'cats express-request',
            test: async () => {
                const response = await fetch(
                    `${origin}/cats/express-request?hello=CatsExpressRequest`
                );
                const responseText = await response.text();

                return testEquality(responseText, 'CatsExpressRequest');
            }
        },
        {
            name: 'cats express-response',
            test: async () => {
                const response = await fetch(`${origin}/cats/express-response`);
                const responseText = await response.text();

                return testEquality(responseText, 'Cats Express Response');
            }
        }
    ];
}
