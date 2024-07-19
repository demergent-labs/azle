import {
    acceptMessage,
    caller,
    IDL,
    init,
    inspectMessage,
    methodName,
    postUpgrade,
    preUpgrade,
    Principal,
    query,
    StableBTreeMap,
    update
} from 'azle';

export default class {
    initCaller: Principal | null = null;
    postUpgradeCaller: Principal | null = null;
    preUpgradeCaller = StableBTreeMap<'PRE_UPGRADE_CALLER', Principal>(0);
    inspectMessageCaller: Principal | null = null;

    @init([])
    init(): void {
        this.initCaller = caller();
    }

    @query([], IDL.Opt(IDL.Principal))
    getInitCaller(): [Principal] | [] {
        if (this.initCaller === null) {
            return [];
        } else {
            return [this.initCaller];
        }
    }

    @postUpgrade([])
    postUpgrade(): void {
        this.postUpgradeCaller = caller();
    }

    @query([], IDL.Opt(IDL.Principal))
    getPostUpgradeCaller(): [Principal] | [] {
        if (this.postUpgradeCaller === null) {
            return [];
        } else {
            return [this.postUpgradeCaller];
        }
    }

    @preUpgrade
    preUpgrade(): void {
        this.preUpgradeCaller.insert('PRE_UPGRADE_CALLER', caller());
    }

    @query([], IDL.Opt(IDL.Principal))
    getPreUpgradeCaller(): [Principal] | [] {
        const preUpgradeCaller =
            this.preUpgradeCaller.get('PRE_UPGRADE_CALLER');

        if (preUpgradeCaller === null) {
            return [];
        } else {
            return [preUpgradeCaller];
        }
    }

    @inspectMessage
    inspectMessage(): void {
        if (methodName() === 'getInspectMessageCaller') {
            if (caller().toText() === this.inspectMessageCaller?.toText()) {
                acceptMessage();
            }
        } else {
            acceptMessage();
        }
    }

    @update([])
    setInspectMessageCaller(): void {
        this.inspectMessageCaller = caller();
    }

    @query([], IDL.Opt(IDL.Principal))
    getInspectMessageCaller(): [Principal] | [] {
        if (this.inspectMessageCaller === null) {
            return [];
        } else {
            return [this.inspectMessageCaller];
        }
    }

    @query([], IDL.Principal)
    getQueryCaller(): Principal {
        return caller();
    }

    @update([], IDL.Principal)
    getUpdateCaller(): Principal {
        return caller();
    }
}
