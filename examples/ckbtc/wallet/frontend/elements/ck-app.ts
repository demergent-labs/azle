import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AuthClient } from '@dfinity/auth-client';
import { ActorSubclass, HttpAgent, Identity } from '@dfinity/agent';
import { createActor } from '../dfx_generated/wallet_backend';
import { _SERVICE } from '../dfx_generated/wallet_backend/wallet_backend.did';
import { nat, nat64 } from 'azle';

@customElement('ck-app')
export class CkApp extends LitElement {
    @state()
    identity: Identity | undefined;

    @state()
    walletBackend: ActorSubclass<_SERVICE> | undefined;

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

    @state()
    transferring: boolean = false;

    async connectedCallback() {
        super.connectedCallback();

        await this.authenticate();
    }

    async authenticate() {
        const authClient = await AuthClient.create();

        if (await authClient.isAuthenticated()) {
            this.identity = authClient.getIdentity();

            this.initialize();
        } else {
            await authClient.login({
                identityProvider:
                    'http://4duc2-jqaaa-aaaaa-aabiq-cai.localhost:8000',
                maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
                onSuccess: () => {
                    this.identity = authClient.getIdentity();

                    this.initialize();
                }
            });
        }
    }

    initialize() {
        this.createWalletBackend();

        this.getBalance();
        this.getBitcoinDepositAddress();
    }

    createWalletBackend() {
        const agent = new HttpAgent({
            identity: this.identity
        });

        if (process.env['CANISTER_ID_WALLET_BACKEND'] === undefined) {
            alert(`process.env['CANISTER_ID_WALLET_BACKEND'] is undefined`);
            return;
        }

        const walletBackend = createActor(
            process.env['CANISTER_ID_WALLET_BACKEND'],
            {
                agent
            }
        );

        this.walletBackend = walletBackend;
    }

    async getBalance() {
        if (this.walletBackend === undefined) {
            alert(`walletBackend has not been initialized`);
            return;
        }

        const result = await this.walletBackend.getBalance();

        console.log('getBalance', result);

        this.balance = result;
    }

    async getBitcoinDepositAddress() {
        if (this.walletBackend === undefined) {
            alert(`walletBackend has not been initialized`);
            return;
        }

        const result = await this.walletBackend.getDepositAddress();

        console.log('getBitcoinDepositAddress', result);

        this.bitcoinDepositAddress = result;
    }

    async updateBalance() {
        this.updatingBalance = true;

        if (this.walletBackend === undefined) {
            alert(`walletBackend has not been initialized`);
            return;
        }

        const result = await this.walletBackend.updateBalance();

        console.log('updateBalance', result);

        await this.getBalance();

        this.updatingBalance = false;
    }

    async transfer() {
        this.transferring = true;

        if (this.walletBackend === undefined) {
            alert(`walletBackend has not been initialized`);
            return;
        }

        if (this.transferTo === '') {
            alert('Must enter a principal to transfer to');
            return;
        }

        const result = await this.walletBackend.transfer(
            this.transferTo,
            this.transferAmount
        );

        console.log('transfer', result);

        await this.getBalance();

        this.transferring = false;
    }

    render() {
        const identityPrincipalString = this.identity
            ? this.identity.getPrincipal().toText()
            : 'Loading...';

        const balanceString =
            this.balance === undefined || this.updatingBalance
                ? 'Loading...'
                : this.balance;

        const depositAddressString = this.bitcoinDepositAddress ?? 'Loading...';

        return html`
            <h1>ckBTC</h1>
            <div>Bitcoin deposit address: ${depositAddressString}</div>
            <div>ckBTC principal: ${identityPrincipalString}</div>
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
                    .disabled=${this.transferring}
                    type="text"
                    .value=${this.transferTo}
                    @input=${(e: any) => (this.transferTo = e.target.value)}
                />
                Amount:
                <input
                    .disabled=${this.transferring}
                    type="number"
                    .value=${this.transferAmount}
                    @input=${(e: any) =>
                        (this.transferAmount = BigInt(e.target.value))}
                />
                <button
                    .disabled=${this.transferring}
                    @click=${this.transfer}
                >
                    Transfer
                </button>
            </div>
        `;
    }
}
