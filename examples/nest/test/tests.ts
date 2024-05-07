import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: 'app get',
            test: async () => {
                const response = await fetch(`${origin}/get`);
                const responseText = await response.text();

                return {
                    Ok: responseText === 'get'
                };
            }
        },
        {
            name: 'app post',
            test: async () => {
                const response = await fetch(`${origin}/post`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'post'
                };
            }
        },
        {
            name: 'app put',
            test: async () => {
                const response = await fetch(`${origin}/put`, {
                    method: 'PUT'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'put'
                };
            }
        },
        {
            name: 'app patch',
            test: async () => {
                const response = await fetch(`${origin}/patch`, {
                    method: 'PATCH'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'patch'
                };
            }
        },
        {
            name: 'app delete',
            test: async () => {
                const response = await fetch(`${origin}/delete`, {
                    method: 'DELETE'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'delete'
                };
            }
        },
        {
            name: 'app json',
            test: async () => {
                const response = await fetch(`${origin}/json`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.hello === 'AppJson'
                };
            }
        },
        {
            name: 'app header',
            test: async () => {
                const response = await fetch(`${origin}/header`, {
                    headers: [['X-App-Header-Key', 'AppHeaderValue']]
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'AppHeaderValue'
                };
            }
        },
        {
            name: 'app http-code',
            test: async () => {
                const response = await fetch(`${origin}/http-code`);
                const responseText = await response.text();

                return {
                    Ok:
                        response.status === 418 &&
                        response.statusText === `I'm a teapot` &&
                        responseText === `App I'm a teapot`
                };
            }
        },
        {
            name: 'app query',
            test: async () => {
                const response = await fetch(`${origin}/query?hello=AppQuery`);
                const responseText = await response.text();

                return {
                    Ok: responseText === 'AppQuery'
                };
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

                return {
                    Ok: responseText === 'AppBody'
                };
            }
        },
        {
            name: 'app express-request',
            test: async () => {
                const response = await fetch(
                    `${origin}/express-request?hello=AppExpressRequest`
                );
                const responseText = await response.text();

                return {
                    Ok: responseText === 'AppExpressRequest'
                };
            }
        },
        {
            name: 'app express-response',
            test: async () => {
                const response = await fetch(`${origin}/express-response`);
                const responseText = await response.text();

                return {
                    Ok: responseText === 'App Express Response'
                };
            }
        },
        {
            name: 'dogs get',
            test: async () => {
                const response = await fetch(`${origin}/dogs/get`);
                const responseText = await response.text();

                return {
                    Ok: responseText === 'dogs get'
                };
            }
        },
        {
            name: 'dogs post',
            test: async () => {
                const response = await fetch(`${origin}/dogs/post`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'dogs post'
                };
            }
        },
        {
            name: 'dogs put',
            test: async () => {
                const response = await fetch(`${origin}/dogs/put`, {
                    method: 'PUT'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'dogs put'
                };
            }
        },
        {
            name: 'dogs patch',
            test: async () => {
                const response = await fetch(`${origin}/dogs/patch`, {
                    method: 'PATCH'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'dogs patch'
                };
            }
        },
        {
            name: 'dogs delete',
            test: async () => {
                const response = await fetch(`${origin}/dogs/delete`, {
                    method: 'DELETE'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'dogs delete'
                };
            }
        },
        {
            name: 'dogs json',
            test: async () => {
                const response = await fetch(`${origin}/dogs/json`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.hello === 'DogsJson'
                };
            }
        },
        {
            name: 'dogs header',
            test: async () => {
                const response = await fetch(`${origin}/dogs/header`, {
                    headers: [['X-Dogs-Header-Key', 'DogsHeaderValue']]
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'DogsHeaderValue'
                };
            }
        },
        {
            name: 'dogs http-code',
            test: async () => {
                const response = await fetch(`${origin}/dogs/http-code`);
                const responseText = await response.text();

                return {
                    Ok:
                        response.status === 418 &&
                        response.statusText === `I'm a teapot` &&
                        responseText === `Dogs I'm a teapot`
                };
            }
        },
        {
            name: 'dogs query',
            test: async () => {
                const response = await fetch(
                    `${origin}/dogs/query?hello=DogsQuery`
                );
                const responseText = await response.text();

                return {
                    Ok: responseText === 'DogsQuery'
                };
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

                return {
                    Ok: responseText === 'DogsBody'
                };
            }
        },
        {
            name: 'dogs express-request',
            test: async () => {
                const response = await fetch(
                    `${origin}/dogs/express-request?hello=DogsExpressRequest`
                );
                const responseText = await response.text();

                return {
                    Ok: responseText === 'DogsExpressRequest'
                };
            }
        },
        {
            name: 'dogs express-response',
            test: async () => {
                const response = await fetch(`${origin}/dogs/express-response`);
                const responseText = await response.text();

                return {
                    Ok: responseText === 'Dogs Express Response'
                };
            }
        },
        {
            name: 'cats get',
            test: async () => {
                const response = await fetch(`${origin}/cats/get`);
                const responseText = await response.text();

                return {
                    Ok: responseText === 'cats get'
                };
            }
        },
        {
            name: 'cats post',
            test: async () => {
                const response = await fetch(`${origin}/cats/post`, {
                    method: 'POST'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'cats post'
                };
            }
        },
        {
            name: 'cats put',
            test: async () => {
                const response = await fetch(`${origin}/cats/put`, {
                    method: 'PUT'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'cats put'
                };
            }
        },
        {
            name: 'cats patch',
            test: async () => {
                const response = await fetch(`${origin}/cats/patch`, {
                    method: 'PATCH'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'cats patch'
                };
            }
        },
        {
            name: 'cats delete',
            test: async () => {
                const response = await fetch(`${origin}/cats/delete`, {
                    method: 'DELETE'
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'cats delete'
                };
            }
        },
        {
            name: 'cats json',
            test: async () => {
                const response = await fetch(`${origin}/cats/json`);
                const responseJson = await response.json();

                return {
                    Ok: responseJson.hello === 'CatsJson'
                };
            }
        },
        {
            name: 'cats header',
            test: async () => {
                const response = await fetch(`${origin}/cats/header`, {
                    headers: [['X-Cats-Header-Key', 'CatsHeaderValue']]
                });
                const responseText = await response.text();

                return {
                    Ok: responseText === 'CatsHeaderValue'
                };
            }
        },
        {
            name: 'cats http-code',
            test: async () => {
                const response = await fetch(`${origin}/cats/http-code`);
                const responseText = await response.text();

                return {
                    Ok:
                        response.status === 418 &&
                        response.statusText === `I'm a teapot` &&
                        responseText === `Cats I'm a teapot`
                };
            }
        },
        {
            name: 'cats query',
            test: async () => {
                const response = await fetch(
                    `${origin}/cats/query?hello=CatsQuery`
                );
                const responseText = await response.text();

                return {
                    Ok: responseText === 'CatsQuery'
                };
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

                return {
                    Ok: responseText === 'CatsBody'
                };
            }
        },
        {
            name: 'cats express-request',
            test: async () => {
                const response = await fetch(
                    `${origin}/cats/express-request?hello=CatsExpressRequest`
                );
                const responseText = await response.text();

                return {
                    Ok: responseText === 'CatsExpressRequest'
                };
            }
        },
        {
            name: 'cats express-response',
            test: async () => {
                const response = await fetch(`${origin}/cats/express-response`);
                const responseText = await response.text();

                return {
                    Ok: responseText === 'Cats Express Response'
                };
            }
        }
    ];
}
