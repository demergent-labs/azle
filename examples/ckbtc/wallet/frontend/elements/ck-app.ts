import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AuthClient } from '@dfinity/auth-client';
import { Identity, HttpAgent } from '@dfinity/agent';
import { createActor } from '../dfx_generate/wallet_backend';
import { nat, nat64 } from 'azle';

@customElement('ck-app')
export class CkApp extends LitElement {
    @state()
    identity: Identity | undefined;

    @state()
    balance: nat64 | undefined;

    @state()
    bitcoinDepositAddress: string | undefined;

    @state()
    updatingBalance: boolean = false;

    @state()
    transferTo: string = '';

    @state()
    transferAmount: nat = 0n;

    async connectedCallback() {
        super.connectedCallback();

        await this.authenticate();
        this.getBalance();
        this.getBitcoinDepositAddress();
    }

    async authenticate() {
        const authClient = await AuthClient.create();

        if (await authClient.isAuthenticated()) {
            this.identity = authClient.getIdentity();
        } else {
            await authClient.login({
                identityProvider:
                    'http://4duc2-jqaaa-aaaaa-aabiq-cai.localhost:8000',
                maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
                onSuccess: () => {
                    this.identity = authClient.getIdentity();
                }
            });
        }
    }

    async getBalance() {
        const agent = new HttpAgent({
            identity: this.identity
        });

        const walletBackend = createActor('7ugoi-yiaaa-aaaaa-aabaa-cai', {
            agent
        });

        const result = await walletBackend.getBalance();

        this.balance = result;
    }

    async getBitcoinDepositAddress() {
        const agent = new HttpAgent({
            identity: this.identity
        });

        const walletBackend = createActor('7ugoi-yiaaa-aaaaa-aabaa-cai', {
            agent
        });

        const result = await walletBackend.getDepositAddress();

        this.bitcoinDepositAddress = result;
    }

    async updateBalance() {
        this.updatingBalance = true;

        const agent = new HttpAgent({
            identity: this.identity
        });

        const walletBackend = createActor('7ugoi-yiaaa-aaaaa-aabaa-cai', {
            agent
        });

        const result = await walletBackend.updateBalance();

        console.log(result);

        await this.getBalance();

        this.updatingBalance = false;
    }

    async transfer() {
        const agent = new HttpAgent({
            identity: this.identity
        });

        const walletBackend = createActor('7ugoi-yiaaa-aaaaa-aabaa-cai', {
            agent
        });

        if (this.transferTo === '') {
            alert('Must enter a principal to transfer to');
            return;
        }

        const result = await walletBackend.transfer(
            this.transferTo,
            this.transferAmount
        );

        console.log(result);

        await this.getBalance();
    }

    render() {
        const identityPrincipalString = this.identity
            ? this.identity.getPrincipal().toText()
            : '';

        const balanceString =
            this.balance === undefined || this.updatingBalance
                ? 'Loading...'
                : this.balance;

        const depositAddressString = this.bitcoinDepositAddress ?? 'Loading...';

        return html`
            <h1>ckBTC</h1>
            <h2>${identityPrincipalString}</h2>
            <div>Bitcoin deposit address: ${depositAddressString}</div>
            <div>ckBTC balance: ${balanceString}</div>
            <div>
                <button
                    .disabled=${this.updatingBalance}
                    @click=${this.updateBalance}
                >
                    Update Balance
                </button>
            </div>

            <div>
                <div>Transfer:</div>
                To:
                <input
                    type="text"
                    .value=${this.transferTo}
                    @input=${(e: any) => (this.transferTo = e.target.value)}
                />
                Amount:
                <input
                    type="number"
                    .value=${this.transferAmount}
                    @input=${(e: any) =>
                        (this.transferAmount = BigInt(e.target.value))}
                />
                <button @click=${this.transfer}>Transfer</button>
            </div>
        `;
    }
}
