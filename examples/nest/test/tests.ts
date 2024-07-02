import { expect, it, Test } from 'azle/test';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('app get', async () => {
            const response = await fetch(`${origin}/get`);
            const responseText = await response.text();

            expect(responseText).toBe('get');
        });

        it('app post', async () => {
            const response = await fetch(`${origin}/post`, {
                method: 'POST'
            });
            const responseText = await response.text();

            expect(responseText).toBe('post');
        });

        it('app put', async () => {
            const response = await fetch(`${origin}/put`, {
                method: 'PUT'
            });
            const responseText = await response.text();

            expect(responseText).toBe('put');
        });

        it('app patch', async () => {
            const response = await fetch(`${origin}/patch`, {
                method: 'PATCH'
            });
            const responseText = await response.text();

            expect(responseText).toBe('patch');
        });

        it('app delete', async () => {
            const response = await fetch(`${origin}/delete`, {
                method: 'DELETE'
            });
            const responseText = await response.text();

            expect(responseText).toBe('delete');
        });

        it('app json', async () => {
            const response = await fetch(`${origin}/json`);
            const responseJson = await response.json();

            expect(responseJson.hello).toBe('AppJson');
        });

        it('app header', async () => {
            const response = await fetch(`${origin}/header`, {
                headers: [['X-App-Header-Key', 'AppHeaderValue']]
            });
            const responseText = await response.text();

            expect(responseText).toBe('AppHeaderValue');
        });

        it('app http-code', async () => {
            const response = await fetch(`${origin}/http-code`);
            const responseText = await response.text();

            expect(response.status).toBe(418);
            expect(response.statusText).toBe(`I'm a teapot`);
            expect(responseText).toBe(`App I'm a teapot`);
        });

        it('app query', async () => {
            const response = await fetch(`${origin}/query?hello=AppQuery`);
            const responseText = await response.text();

            expect(responseText).toBe('AppQuery');
        });

        it('app body', async () => {
            const response = await fetch(`${origin}/body`, {
                method: 'POST',
                headers: [['Content-Type', 'Application/Json']],
                body: JSON.stringify({
                    hello: 'AppBody'
                })
            });
            const responseText = await response.text();

            expect(responseText).toBe('AppBody');
        });

        it('app express-request', async () => {
            const response = await fetch(
                `${origin}/express-request?hello=AppExpressRequest`
            );
            const responseText = await response.text();

            expect(responseText).toBe('AppExpressRequest');
        });

        it('app express-response', async () => {
            const response = await fetch(`${origin}/express-response`);
            const responseText = await response.text();

            expect(responseText).toBe('App Express Response');
        });

        it('dogs get', async () => {
            const response = await fetch(`${origin}/dogs/get`);
            const responseText = await response.text();

            expect(responseText).toBe('dogs get');
        });

        it('dogs post', async () => {
            const response = await fetch(`${origin}/dogs/post`, {
                method: 'POST'
            });
            const responseText = await response.text();

            expect(responseText).toBe('dogs post');
        });

        it('dogs put', async () => {
            const response = await fetch(`${origin}/dogs/put`, {
                method: 'PUT'
            });
            const responseText = await response.text();

            expect(responseText).toBe('dogs put');
        });

        it('dogs patch', async () => {
            const response = await fetch(`${origin}/dogs/patch`, {
                method: 'PATCH'
            });
            const responseText = await response.text();

            expect(responseText).toBe('dogs patch');
        });

        it('dogs delete', async () => {
            const response = await fetch(`${origin}/dogs/delete`, {
                method: 'DELETE'
            });
            const responseText = await response.text();

            expect(responseText).toBe('dogs delete');
        });

        it('dogs json', async () => {
            const response = await fetch(`${origin}/dogs/json`);
            const responseJson = await response.json();

            expect(responseJson.hello).toBe('DogsJson');
        });

        it('dogs header', async () => {
            const response = await fetch(`${origin}/dogs/header`, {
                headers: [['X-Dogs-Header-Key', 'DogsHeaderValue']]
            });
            const responseText = await response.text();

            expect(responseText).toBe('DogsHeaderValue');
        });

        it('dogs http-code', async () => {
            const response = await fetch(`${origin}/dogs/http-code`);
            const responseText = await response.text();

            expect(response.status).toBe(418);
            expect(response.statusText).toBe(`I'm a teapot`);
            expect(responseText).toBe(`Dogs I'm a teapot`);
        });

        it('dogs query', async () => {
            const response = await fetch(
                `${origin}/dogs/query?hello=DogsQuery`
            );
            const responseText = await response.text();

            expect(responseText).toBe('DogsQuery');
        });

        it('dogs body', async () => {
            const response = await fetch(`${origin}/dogs/body`, {
                method: 'POST',
                headers: [['Content-Type', 'Application/Json']],
                body: JSON.stringify({
                    hello: 'DogsBody'
                })
            });
            const responseText = await response.text();

            expect(responseText).toBe('DogsBody');
        });

        it('dogs express-request', async () => {
            const response = await fetch(
                `${origin}/dogs/express-request?hello=DogsExpressRequest`
            );
            const responseText = await response.text();

            expect(responseText).toBe('DogsExpressRequest');
        });

        it('dogs express-response', async () => {
            const response = await fetch(`${origin}/dogs/express-response`);
            const responseText = await response.text();

            expect(responseText).toBe('Dogs Express Response');
        });

        it('cats get', async () => {
            const response = await fetch(`${origin}/cats/get`);
            const responseText = await response.text();

            expect(responseText).toBe('cats get');
        });

        it('cats post', async () => {
            const response = await fetch(`${origin}/cats/post`, {
                method: 'POST'
            });
            const responseText = await response.text();

            expect(responseText).toBe('cats post');
        });

        it('cats put', async () => {
            const response = await fetch(`${origin}/cats/put`, {
                method: 'PUT'
            });
            const responseText = await response.text();

            expect(responseText).toBe('cats put');
        });

        it('cats patch', async () => {
            const response = await fetch(`${origin}/cats/patch`, {
                method: 'PATCH'
            });
            const responseText = await response.text();

            expect(responseText).toBe('cats patch');
        });

        it('cats delete', async () => {
            const response = await fetch(`${origin}/cats/delete`, {
                method: 'DELETE'
            });
            const responseText = await response.text();

            expect(responseText).toBe('cats delete');
        });

        it('cats json', async () => {
            const response = await fetch(`${origin}/cats/json`);
            const responseJson = await response.json();

            expect(responseJson.hello).toBe('CatsJson');
        });

        it('cats header', async () => {
            const response = await fetch(`${origin}/cats/header`, {
                headers: [['X-Cats-Header-Key', 'CatsHeaderValue']]
            });
            const responseText = await response.text();

            expect(responseText).toBe('CatsHeaderValue');
        });

        it('cats http-code', async () => {
            const response = await fetch(`${origin}/cats/http-code`);
            const responseText = await response.text();

            expect(response.status).toBe(418);
            expect(response.statusText).toBe(`I'm a teapot`);
            expect(responseText).toBe(`Cats I'm a teapot`);
        });

        it('cats query', async () => {
            const response = await fetch(
                `${origin}/cats/query?hello=CatsQuery`
            );
            const responseText = await response.text();

            expect(responseText).toBe('CatsQuery');
        });

        it('cats body', async () => {
            const response = await fetch(`${origin}/cats/body`, {
                method: 'POST',
                headers: [['Content-Type', 'Application/Json']],
                body: JSON.stringify({
                    hello: 'CatsBody'
                })
            });
            const responseText = await response.text();

            expect(responseText).toBe('CatsBody');
        });

        it('cats express-request', async () => {
            const response = await fetch(
                `${origin}/cats/express-request?hello=CatsExpressRequest`
            );
            const responseText = await response.text();

            expect(responseText).toBe('CatsExpressRequest');
        });

        it('cats express-response', async () => {
            const response = await fetch(`${origin}/cats/express-response`);
            const responseText = await response.text();

            expect(responseText).toBe('Cats Express Response');
        });
    };
}
