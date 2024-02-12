import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('azle-app')
export class AzleApp extends LitElement {
    canisterOrigin: string = `http://${
        import.meta.env.VITE_CANISTER_ID
    }.localhost:8000`;

    @property()
    resSendResponse: string = '';

    @property()
    resWriteResponse: string = '';

    @property()
    fileStreamResponse: string = '';

    @property()
    globalStateResponse: string = JSON.stringify({});

    async testResSend() {
        this.resSendResponse = 'Loading...';

        const response = await fetch(`${this.canisterOrigin}/res-send`);
        const responseText = await response.text();

        this.resSendResponse = responseText;
    }

    async testResWrite() {
        this.resWriteResponse = 'Loading...';

        const response = await fetch(`${this.canisterOrigin}/res-write`);
        const responseText = await response.text();

        this.resWriteResponse = responseText;
    }

    async testFileStream() {
        this.fileStreamResponse = 'Loading...';

        const response = await fetch(`${this.canisterOrigin}/file-stream`);
        const responseText = await response.text();

        this.fileStreamResponse = responseText;
    }

    async testGlobalState() {
        this.globalStateResponse = 'Loading...';

        const response = await fetch(
            `${this.canisterOrigin}/global-state/post`,
            {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    hello: 'world'
                })
            }
        );
        const responseJson = await response.json();

        this.globalStateResponse = JSON.stringify(responseJson);
    }

    async deleteGlobalState() {
        this.globalStateResponse = 'Loading...';

        const response = await fetch(
            `${this.canisterOrigin}/global-state/delete`,
            {
                method: 'DELETE'
            }
        );
        const responseJson = await response.json();

        this.globalStateResponse = JSON.stringify(responseJson);
    }

    render() {
        return html`
            <h1>Azle Express App</h1>

            <div>
                <button @click=${this.testResSend}>Test res.send</button>:
                ${this.resSendResponse}
            </div>

            <br />

            <div>
                <button @click=${this.testResWrite}>Test res.write</button>:
                ${this.resWriteResponse}
            </div>

            <br />

            <div>
                <button @click=${this.testFileStream}>Test file stream</button>:
                ${this.fileStreamResponse}
            </div>

            <br />

            <div>
                <button @click=${this.testGlobalState}>Test global state</button
                >: ${this.globalStateResponse}
            </div>

            <br />

            <div>
                <button @click=${this.deleteGlobalState}>
                    Delete global state
                </button>
            </div>
        `;
    }
}
