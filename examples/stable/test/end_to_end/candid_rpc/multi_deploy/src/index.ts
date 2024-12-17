import { IDL, init, postUpgrade, query } from 'azle';

export default class {
    initCalled: boolean = false;
    postUpgradeCalled: boolean = false;

    @init([])
    init(): void {
        console.info('Init was called');
        this.initCalled = true;
        this.postUpgradeCalled = false;
    }

    @query([], IDL.Bool)
    getInitCalled(): boolean {
        return this.initCalled;
    }

    @query([], IDL.Bool)
    getAzleInitCalled(): boolean {
        return globalThis._azleInitCalled;
    }

    @postUpgrade([])
    postUpgrade(): void {
        console.info('Post Upgrade was called');
        this.initCalled = false;
        this.postUpgradeCalled = true;
    }

    @query([], IDL.Bool)
    getPostUpgradeCalled(): boolean {
        return this.postUpgradeCalled;
    }

    @query([], IDL.Bool)
    getAzlePostUpgradeCalled(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }
}
