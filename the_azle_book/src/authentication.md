# Authentication TL;DR

Azle canisters can import `ic` from `azle` and use `ic.caller()` to get the [principal (public-key linked identifier)](https://internetcomputer.org/docs/current/references/ic-interface-spec#principal) of the initiator of an HTTP request. HTTP requests are anonymous (principal `2vxsx-fae`) by default, but authentication with web browsers (and maybe Node.js) can be done using a JWT-like API from `azle/http_client`.

First you import `toJwt` from `azle/http_client`:

```typescript
import { toJwt } from 'azle/http_client';
```

Then you use `fetch` and construct an `Authorization` header using an [@dfinity/agent](https://www.npmjs.com/package/@dfinity/agent) `Identity`:

```typescript
const response = await fetch(
    `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/whoami`,
    {
        method: 'GET',
        headers: [['Authorization', toJwt(this.identity)]]
    }
);
```

Here's an example of the frontend of a simple web application using `azle/http_client` and [Internet Identity](https://internetcomputer.org/internet-identity):

```typescript
import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { toJwt } from 'azle/http_client';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('azle-app')
export class AzleApp extends LitElement {
    @property()
    identity: Identity | null = null;

    @property()
    whoami: string = '';

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

            <button
                id="whoamiUnauthenticated"
                @click=${this.whoamiUnauthenticated}
            >
                Whoami Unauthenticated
            </button>
            <button
                id="whoamiAuthenticated"
                @click=${this.whoamiAuthenticated}
                .disabled=${this.identity === null}
            >
                Whoami Authenticated
            </button>
        `;
    }
}
```

Here's an example of the backend of that same simple web application:

```typescript
import { ic } from 'azle';
import express from 'express';

const app = express();

app.get('/whoami', (req, res) => {
    res.send(ic.caller().toString());
});

app.use(express.static('/dist'));

app.listen();
```

# Authentication

Examples:

-   [ckbtc](https://github.com/demergent-labs/azle/tree/main/examples/ckbtc)
-   [fetch_ic](https://github.com/demergent-labs/azle/tree/main/examples/fetch_ic)
-   [internet_identity](https://github.com/demergent-labs/azle/tree/main/examples/internet_identity)

## Under-the-hood

Authentication of ICP calls is done through signatures on messages. [@dfinity/agent](https://www.npmjs.com/package/@dfinity/agent) provides very nice abstractions for creating all of the required signatures in the correct formats when calling into canisters on ICP. Unfortunately this requires you to abandon traditional HTTP requests, as you must use the agent's APIs.

Azle attempts to enable you to perform traditional HTTP requests with traditional libraries. Currently Azle focuses on `fetch`. When importing `toJwt`, `azle/http_client` will overwrite the global `fetch` function and will intercept `fetch` requests that have `Authorization` headers with an `Identity` as a value.

Once intercepted, these requests are turned into `@dfinity/agent` requests that call [the http_request and http_request_update canister methods](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec) directly, thus performing all of the required client-side authentication work.

We are working to push for ICP to more natively understand JWTs for authentication, without the need to intercept `fetch` requests and convert them into agent requests.
