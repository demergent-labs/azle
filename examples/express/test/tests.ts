import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { error, Test, testEquality } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/res-send',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/res-send`);
                    const responseText = await response.text();

                    return testEquality(responseText, 'Just testing res.send');
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/res-write',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/res-write`);
                    const responseText = await response.text();

                    return testEquality(responseText, 'Why hello there sir');
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/file-stream',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/file-stream`);
                    const responseText = await response.text();

                    return testEquality(
                        responseText,
                        'I have written some text to this file'
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/global-state',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/global-state`);
                    const responseJson = await response.json();

                    return testEquality({}, responseJson);
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/500',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/500`);
                    const responseText = await response.text();

                    return testEquality(
                        [response.status, response.statusText, responseText],
                        [500, 'Internal Server Error', 'Internal Server Error']
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/send-file',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/send-file`);
                    const responseText = await response.text();

                    return testEquality(responseText, 'Does this work too?');
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: 'static test.html',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/test.html`);
                    const responseText = await response.text();

                    return testEquality(
                        responseText,
                        '<!DOCTYPE html><html><body>HTML from the filesystem</body></html>'
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/global-state/post',
            test: async () => {
                try {
                    const json = {
                        hello: 'post'
                    };

                    const postResponse = await fetch(
                        `${origin}/global-state/post`,
                        {
                            method: 'POST',
                            headers: [['Content-Type', 'application/json']],
                            body: JSON.stringify(json)
                        }
                    );
                    const postResponseJson = await postResponse.json();

                    const getResponse = await fetch(`${origin}/global-state`);
                    const getResponseJson = await getResponse.json();

                    return testEquality(
                        [postResponseJson, getResponseJson],
                        [json, json]
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/global-state/put',
            test: async () => {
                try {
                    const json = {
                        hello: 'put'
                    };

                    const putResponse = await fetch(
                        `${origin}/global-state/put`,
                        {
                            method: 'PUT',
                            headers: [['Content-Type', 'application/json']],
                            body: JSON.stringify(json)
                        }
                    );
                    const putResponseJson = await putResponse.json();

                    const getResponse = await fetch(`${origin}/global-state`);
                    const getResponseJson = await getResponse.json();

                    return testEquality(
                        [putResponseJson, getResponseJson],
                        [json, json]
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/global-state/patch',
            test: async () => {
                try {
                    const json = {
                        hello: 'patch'
                    };

                    const patchResponse = await fetch(
                        `${origin}/global-state/patch`,
                        {
                            method: 'PATCH',
                            headers: [['Content-Type', 'application/json']],
                            body: JSON.stringify(json)
                        }
                    );
                    const patchResponseJson = await patchResponse.json();

                    const getResponse = await fetch(`${origin}/global-state`);
                    const getResponseJson = await getResponse.json();

                    return testEquality(
                        [patchResponseJson, getResponseJson],
                        [json, json]
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/global-state/delete',
            test: async () => {
                try {
                    const deleteResponse = await fetch(
                        `${origin}/global-state/delete`,
                        {
                            method: 'DELETE'
                        }
                    );
                    const deleteResponseJson = await deleteResponse.json();

                    const getResponse = await fetch(`${origin}/global-state`);
                    const getResponseJson = await getResponse.json();

                    return testEquality(
                        [deleteResponseJson, getResponseJson],
                        [{}, {}]
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/router/user/345',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/router/user/345`);
                    const responseText = await response.text();

                    return testEquality(responseText, '345');
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: '/router/post?id=657',
            test: async () => {
                try {
                    const response = await fetch(
                        `${origin}/router/post?id=657`
                    );
                    const responseText = await response.text();

                    return testEquality(responseText, '657');
                } catch (err: any) {
                    return error(err);
                }
            }
        }
    ];
}
