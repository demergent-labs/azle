import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { toJwt } from 'azle/http_client';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('azle-app')
export class AzleApp extends LitElement {
    @property()
    identity: Identity | null = null;

    connectedCallback() {
        super.connectedCallback();
        this.authenticate();
    }

    async authenticate() {
        const authClient = await AuthClient.create();
        const isAuthenticated = await authClient.isAuthenticated();

        if (isAuthenticated === true) {
            this.handleIsAuthenticated(authClient);
        } else {
            await this.handleIsNotAuthenticated(authClient);
        }
    }

    handleIsAuthenticated(authClient: AuthClient) {
        this.identity = authClient.getIdentity();
    }

    async handleIsNotAuthenticated(authClient: AuthClient) {
        await new Promise((resolve, reject) => {
            authClient.login({
                identityProvider: import.meta.env.VITE_IDENTITY_PROVIDER,
                onSuccess: resolve as () => void,
                onError: reject,
                windowOpenerFeatures: `width=500,height=500`
            });
        });

        this.identity = authClient.getIdentity();
    }

    async headersArray() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/headers-array`,
            {
                method: 'GET',
                headers: [
                    ['Authorization', toJwt(this.identity)],
                    ['X-Azle-Request-Key-0', 'X-Azle-Request-Value-0'],
                    ['X-Azle-Request-Key-1', 'X-Azle-Request-Value-1'],
                    ['X-Azle-Request-Key-2', 'X-Azle-Request-Value-2']
                ]
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            responseJson.value['X-Azle-Request-Key-0'.toLowerCase()] ===
                'X-Azle-Request-Value-0' &&
            responseJson.value['X-Azle-Request-Key-1'.toLowerCase()] ===
                'X-Azle-Request-Value-1' &&
            responseJson.value['X-Azle-Request-Key-2'.toLowerCase()] ===
                'X-Azle-Request-Value-2' &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).headersArraySuccess = true;
        }
    }

    async headersObject() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/headers-object`,
            {
                method: 'GET',
                headers: {
                    Authorization: toJwt(this.identity),
                    'X-Azle-Request-Key-0': 'X-Azle-Request-Value-0',
                    'X-Azle-Request-Key-1': 'X-Azle-Request-Value-1',
                    'X-Azle-Request-Key-2': 'X-Azle-Request-Value-2'
                }
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            responseJson.value['X-Azle-Request-Key-0'.toLowerCase()] ===
                'X-Azle-Request-Value-0' &&
            responseJson.value['X-Azle-Request-Key-1'.toLowerCase()] ===
                'X-Azle-Request-Value-1' &&
            responseJson.value['X-Azle-Request-Key-2'.toLowerCase()] ===
                'X-Azle-Request-Value-2' &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).headersObjectSuccess = true;
        }
    }

    async bodyUint8Array() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const textEncoder = new TextEncoder();
        const encodedText = textEncoder.encode(
            JSON.stringify({
                value: 'body-uint8array'
            })
        );

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/body-uint8array`,
            {
                method: 'POST',
                headers: [
                    ['Authorization', toJwt(this.identity)],
                    ['Content-Type', 'application/json']
                ],
                body: encodedText
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            JSON.stringify(responseJson.value) ===
                JSON.stringify({
                    value: 'body-uint8array'
                }) &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).bodyUint8ArraySuccess = true;
        }
    }

    async bodyString() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/body-string`,
            {
                method: 'PUT',
                headers: [
                    ['Authorization', toJwt(this.identity)],
                    ['Content-Type', 'application/json']
                ],
                body: JSON.stringify({
                    value: 'body-string'
                })
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            JSON.stringify(responseJson.value) ===
                JSON.stringify({
                    value: 'body-string'
                }) &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).bodyStringSuccess = true;
        }
    }

    async bodyArrayBuffer() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const textEncoder = new TextEncoder();
        const encodedText = textEncoder.encode(
            JSON.stringify({
                value: 'body-array-buffer'
            })
        );

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/body-array-buffer`,
            {
                method: 'PATCH',
                headers: [
                    ['Authorization', toJwt(this.identity)],
                    ['Content-Type', 'application/json']
                ],
                body: encodedText.buffer
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            JSON.stringify(responseJson.value) ===
                JSON.stringify({
                    value: 'body-array-buffer'
                }) &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).bodyArrayBufferSuccess = true;
        }
    }

    async bodyBlob() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const textEncoder = new TextEncoder();
        const encodedText = textEncoder.encode(
            JSON.stringify({
                value: 'body-blob'
            })
        );

        const blob = new Blob([encodedText], { type: 'application/json' });

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/body-blob`,
            {
                method: 'DELETE',
                headers: [
                    ['Authorization', toJwt(this.identity)],
                    ['Content-Type', 'application/json']
                ],
                body: blob
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            JSON.stringify(responseJson.value) ===
                JSON.stringify({
                    value: 'body-blob'
                }) &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).bodyBlobSuccess = true;
        }
    }

    async bodyDataView() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const textEncoder = new TextEncoder();
        const encodedText = textEncoder.encode(
            JSON.stringify({
                value: 'body-data-view'
            })
        );

        const dataView = new DataView(encodedText.buffer);

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/body-data-view`,
            {
                method: 'POST',
                headers: [
                    ['Authorization', toJwt(this.identity)],
                    ['Content-Type', 'application/json']
                ],
                body: dataView
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            JSON.stringify(responseJson.value) ===
                JSON.stringify({
                    value: 'body-data-view'
                }) &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).bodyDataViewSuccess = true;
        }
    }

    async urlQueryParamsGet() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const response = await fetch(
            `${
                import.meta.env.VITE_CANISTER_ORIGIN
            }/url-query-params-get?type=get`,
            {
                headers: [['Authorization', toJwt(this.identity)]]
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            responseJson.value.type === 'get' &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).urlQueryParamsGetSuccess = true;
        }
    }

    async urlQueryParamsPost() {
        if (this.identity === null) {
            throw new Error(`Identity must be defined`);
        }

        const response = await fetch(
            `${
                import.meta.env.VITE_CANISTER_ORIGIN
            }/url-query-params-post?type=post`,
            {
                method: 'POST',
                headers: [['Authorization', toJwt(this.identity)]]
            }
        );
        const responseJson = await response.json();

        if (
            responseJson.whoami === this.identity.getPrincipal().toString() &&
            responseJson.value.type === 'post' &&
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).urlQueryParamsPostSuccess = true;
        }
    }

    async notAuthorizedGet() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/not-authorized-get`,
            {
                headers: [['Authorization', toJwt(this.identity)]]
            }
        );

        if (response.status === 401) {
            (window as any).notAuthorizedGetSuccess = true;
        }
    }

    async notAuthorizedPost() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/not-authorized-post`,
            {
                method: 'POST',
                headers: [['Authorization', toJwt(this.identity)]]
            }
        );

        if (response.status === 401) {
            (window as any).notAuthorizedPostSuccess = true;
        }
    }

    async head() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/head`,
            {
                method: 'HEAD',
                headers: [['Authorization', toJwt(this.identity)]]
            }
        );

        if (
            response.headers.get('X-Azle-Response-Key-0') ===
                'X-Azle-Response-Value-0' &&
            response.headers.get('X-Azle-Response-Key-1') ===
                'X-Azle-Response-Value-1' &&
            response.headers.get('X-Azle-Response-Key-2') ===
                'X-Azle-Response-Value-2'
        ) {
            (window as any).headSuccess = true;
        }
    }

    async options() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/options`,
            {
                method: 'OPTIONS',
                headers: [['Authorization', toJwt(this.identity)]]
            }
        );

        if (
            response.headers.get('X-Azle-Response-Key-Options') ===
            'X-Azle-Response-Value-Options'
        ) {
            (window as any).optionsSuccess = true;
        }
    }

    render() {
        return html`
            <h1>Test fetchIc</h1>

            <div>
                <button
                    id="headersArrayButton"
                    @click=${this.headersArray}
                >
                    Headers Array
                </button>
            </div>

            <br />

            <div>
                <button
                    id="headersObjectButton"
                    @click=${this.headersObject}
                >
                    Headers Object
                </button>
            </div>

            <br />

            <div>
                <button
                    id="bodyUint8ArrayButton"
                    @click=${this.bodyUint8Array}
                >
                    Body Uint8Array
                </button>
            </div>

            <br />

            <div>
                <button
                    id="bodyStringButton"
                    @click=${this.bodyString}
                >
                    Body String
                </button>
            </div>

            <br />

            <div>
                <button
                    id="bodyArrayBufferButton"
                    @click=${this.bodyArrayBuffer}
                >
                    Body ArrayBuffer
                </button>
            </div>

            <br />

            <div>
                <button
                    id="bodyBlobButton"
                    @click=${this.bodyBlob}
                >
                    Body Blob
                </button>
            </div>

            <br />

            <div>
                <button
                    id="bodyDataViewButton"
                    @click=${this.bodyDataView}
                >
                    Body DataView
                </button>
            </div>

            <br />

            <div>
                <button
                    id="urlQueryParamsGetButton"
                    @click=${this.urlQueryParamsGet}
                >
                    Url Query Params GET
                </button>
            </div>

            <br />

            <div>
                <button
                    id="urlQueryParamsPostButton"
                    @click=${this.urlQueryParamsPost}
                >
                    Url Query Params POST
                </button>
            </div>

            <br />

            <div>
                <button
                    id="notAuthorizedGetButton"
                    @click=${this.notAuthorizedGet}
                >
                    Not Authorized GET
                </button>
            </div>

            <br />

            <div>
                <button
                    id="notAuthorizedPostButton"
                    @click=${this.notAuthorizedPost}
                >
                    Not Authorized POST
                </button>
            </div>

            <br />

            <div>
                <button
                    id="headButton"
                    @click=${this.head}
                >
                    HEAD
                </button>
            </div>

            <br />

            <div>
                <button
                    id="optionsButton"
                    @click=${this.options}
                >
                    OPTIONS
                </button>
            </div>
        `;
    }
}
