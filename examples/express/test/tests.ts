import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        {
            name: '/res-send',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/res-send`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Just testing res.send'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/res-write',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/res-write`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Why hello there sir'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/file-stream',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/file-stream`);
                    const responseText = await response.text();

                    return {
                        Ok:
                            responseText ===
                            'I have written some text to this file'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/global-state',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/global-state`);
                    const responseJson = await response.json();

                    return {
                        Ok: JSON.stringify({}) === JSON.stringify(responseJson)
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/500',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/500`);
                    const responseText = await response.text();

                    return {
                        Ok:
                            response.status === 500 &&
                            response.statusText === 'Internal Server Error' &&
                            responseText === 'Internal Server Error'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/send-file',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/send-file`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === 'Does this work too?'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'static test.html',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/test.html`);
                    const responseText = await response.text();

                    return {
                        Ok:
                            responseText ===
                            '<!DOCTYPE html><html><body>HTML from the filesystem</body></html>'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok:
                            JSON.stringify(json) ===
                                JSON.stringify(postResponseJson) &&
                            JSON.stringify(json) ===
                                JSON.stringify(getResponseJson)
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok:
                            JSON.stringify(json) ===
                                JSON.stringify(putResponseJson) &&
                            JSON.stringify(json) ===
                                JSON.stringify(getResponseJson)
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok:
                            JSON.stringify(json) ===
                                JSON.stringify(patchResponseJson) &&
                            JSON.stringify(json) ===
                                JSON.stringify(getResponseJson)
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok:
                            JSON.stringify({}) ===
                                JSON.stringify(deleteResponseJson) &&
                            JSON.stringify({}) ===
                                JSON.stringify(getResponseJson)
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: '/router/user/345',
            test: async () => {
                try {
                    const response = await fetch(`${origin}/router/user/345`);
                    const responseText = await response.text();

                    return {
                        Ok: responseText === '345'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok: responseText === '657'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        }
    ];
}
