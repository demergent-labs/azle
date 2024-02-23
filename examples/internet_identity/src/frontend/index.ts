import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { toJwt } from 'azle/client';
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
                onSuccess: resolve as any,
                onError: reject,
                windowOpenerFeatures: `toolbar=0,location=0,menubar=0,width=500,height=500,left=0,top=0` // TODO I would love for this to open on the right side of the screen
            });
        });

        this.identity = authClient.getIdentity();
    }

    async whoamiUnauthenticated() {
        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/whoami`
        );
        const responseText = await response.text();

        alert(responseText);
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

        alert(responseText);
    }

    render() {
        return html`
            <h1>Internet Identity</h1>
            <button @click=${this.whoamiUnauthenticated}>
                Whoami Unauthenticated
            </button>
            <button
                @click=${this.whoamiAuthenticated}
                .disabled=${this.identity === null}
            >
                Whoami Authenticated
            </button>
        `;
    }
}
