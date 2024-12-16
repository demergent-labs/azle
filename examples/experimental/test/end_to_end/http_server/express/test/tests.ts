import { expect, it, Test } from 'azle/test';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('uses res.send', async () => {
            const response = await fetch(`${origin}/res-send`);
            const responseText = await response.text();

            expect(responseText).toBe('Just testing res.send');
        });

        it('uses res.write', async () => {
            const response = await fetch(`${origin}/res-write`);
            const responseText = await response.text();

            expect(responseText).toBe('Why hello there sir');
        });

        it('pipes a file into res', async () => {
            const response = await fetch(`${origin}/file-stream`);
            const responseText = await response.text();

            expect(responseText).toBe('I have written some text to this file');
        });

        it('responds with json', async () => {
            const response = await fetch(`${origin}/global-state`);
            const responseJson = await response.json();

            expect(responseJson).toEqual({});
        });

        it('sends a 500 status', async () => {
            const response = await fetch(`${origin}/500`);
            const responseText = await response.text();

            expect(response.status).toBe(500);
            expect(response.statusText).toBe('Internal Server Error');
            expect(responseText).toBe('Internal Server Error');
        });

        it('uses res.sendFile', async () => {
            const response = await fetch(`${origin}/send-file`);
            const responseText = await response.text();

            expect(responseText).toBe('Does this work too?');
        });

        it('serves static html', async () => {
            const response = await fetch(`${origin}/test.html`);
            const responseText = await response.text();

            expect(responseText).toBe(
                '<!DOCTYPE html><html><body>HTML from the filesystem</body></html>'
            );
        });

        it('handles posts', async () => {
            const json = {
                hello: 'post'
            };

            const postResponse = await fetch(`${origin}/global-state/post`, {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify(json)
            });
            const postResponseJson = await postResponse.json();

            const getResponse = await fetch(`${origin}/global-state`);
            const getResponseJson = await getResponse.json();

            expect(postResponseJson).toEqual(json);
            expect(getResponseJson).toEqual(json);
        });

        it('handles puts', async () => {
            const json = {
                hello: 'put'
            };

            const putResponse = await fetch(`${origin}/global-state/put`, {
                method: 'PUT',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify(json)
            });
            const putResponseJson = await putResponse.json();

            const getResponse = await fetch(`${origin}/global-state`);
            const getResponseJson = await getResponse.json();

            expect(putResponseJson).toEqual(json);
            expect(getResponseJson).toEqual(json);
        });

        it('handles patches', async () => {
            const json = {
                hello: 'patch'
            };

            const patchResponse = await fetch(`${origin}/global-state/patch`, {
                method: 'PATCH',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify(json)
            });
            const patchResponseJson = await patchResponse.json();

            const getResponse = await fetch(`${origin}/global-state`);
            const getResponseJson = await getResponse.json();

            expect(patchResponseJson).toEqual(json);
            expect(getResponseJson).toEqual(json);
        });

        it('handles deletes', async () => {
            const deleteResponse = await fetch(
                `${origin}/global-state/delete`,
                {
                    method: 'DELETE'
                }
            );
            const deleteResponseJson = await deleteResponse.json();

            const getResponse = await fetch(`${origin}/global-state`);
            const getResponseJson = await getResponse.json();

            expect(deleteResponseJson).toEqual({});
            expect(getResponseJson).toEqual({});
        });

        it('handles complex routes', async () => {
            const response = await fetch(`${origin}/router/user/345`);
            const responseText = await response.text();

            expect(responseText).toBe('345');
        });

        it('uses query params', async () => {
            const response = await fetch(`${origin}/router/post?id=657`);
            const responseText = await response.text();

            expect(responseText).toBe('657');
        });
    };
}
