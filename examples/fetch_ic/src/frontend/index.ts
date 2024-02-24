import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { toJwt } from 'azle/client';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('azle-app')
export class AzleApp extends LitElement {
    @property()
    identity: Identity | null = null;

    @property()
    whoami: string = '';

    @property()
    headersArrayText: string = '';

    @property()
    headersObjectText: string = '';

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
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/headers-array`,
            {
                method: 'GET',
                headers: [
                    ['Authorization', toJwt(this.identity)],
                    ['x-azle-0', 'x-azle-0'],
                    ['x-azle-1', 'x-azle-1'],
                    ['x-azle-2', 'x-azle-2']
                ]
            }
        );
        const responseJson = await response.json();

        this.headersArrayText = JSON.stringify(responseJson);
    }

    async headersObject() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/headers-object`,
            {
                method: 'GET',
                headers: {
                    Authorization: toJwt(this.identity),
                    'x-azle-0': 'x-azle-0',
                    'x-azle-1': 'x-azle-1',
                    'x-azle-2': 'x-azle-2'
                }
            }
        );
        const responseJson = await response.json();

        this.headersObjectText = JSON.stringify(responseJson);
    }

    async bodyUint8Array() {
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

        console.log('responseJson', responseJson);
    }

    async bodyString() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/body-string`,
            {
                method: 'POST',
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

        console.log('responseJson', responseJson);
    }

    async whoamiUnauthenticated() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/whoami`
        );
        const responseText = await response.text();

        this.whoami = responseText;
    }

    async whoamiAuthenticated() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/whoami`,
            {
                method: 'GET',
                headers: [['Authorization', toJwt(this.identity)]]
            }
        );
        const responseText = await response.text();

        this.whoami = responseText;
    }

    render() {
        return html`
            <h1>Internet Identity</h1>

            <h2>
                Whoami principal:
                <span id="whoamiPrincipal">${this.whoami}</span>
            </h2>

            <div>
                <button
                    id="whoamiUnauthenticated"
                    @click=${this.whoamiUnauthenticated}
                >
                    Whoami Unauthenticated
                </button>
            </div>

            <br />

            <div>
                <button
                    id="whoamiAuthenticated"
                    @click=${this.whoamiAuthenticated}
                    .disabled=${this.identity === null}
                >
                    Whoami Authenticated
                </button>
            </div>

            <br />

            <div>
                <button
                    id="headersArrayButton"
                    @click=${this.headersArray}
                >
                    Headers Array
                </button>
                <input
                    id="headersArrayInput"
                    type="text"
                    .value=${this.headersArrayText}
                />
            </div>

            <br />

            <div>
                <button
                    id="headersObjectButton"
                    @click=${this.headersObject}
                >
                    Headers Object
                </button>
                <input
                    id="headersObjectInput"
                    type="text"
                    .value=${this.headersObjectText}
                />
            </div>

            <br />

            <div>
                <button @click=${this.bodyUint8Array}>Body Uint8Array</button>
            </div>

            <br />

            <div>
                <button @click=${this.bodyString}>Body String</button>
            </div>
        `;
    }
}
