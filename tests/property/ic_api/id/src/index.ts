import {
    acceptMessage,
    id,
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
    initId: Principal | null = null;
    postUpgradeId: Principal | null = null;
    preUpgradeId = StableBTreeMap<'PRE_UPGRADE_ID', Principal>(0);
    inspectMessageId: Principal | null = null;

    @init([])
    init(): void {
        this.initId = id();
    }

    @query([], IDL.Opt(IDL.Principal))
    getInitId(): [Principal] | [] {
        if (this.initId === null) {
            return [];
        } else {
            return [this.initId];
        }
    }

    @postUpgrade([])
    postUpgrade(): void {
        this.postUpgradeId = id();
    }

    @query([], IDL.Opt(IDL.Principal))
    getPostUpgradeId(): [Principal] | [] {
        if (this.postUpgradeId === null) {
            return [];
        } else {
            return [this.postUpgradeId];
        }
    }

    @preUpgrade
    preUpgrade(): void {
        this.preUpgradeId.insert('PRE_UPGRADE_ID', id());
    }

    @query([], IDL.Opt(IDL.Principal))
    getPreUpgradeId(): [Principal] | [] {
        const preUpgradeId = this.preUpgradeId.get('PRE_UPGRADE_ID');

        if (preUpgradeId === null) {
            return [];
        } else {
            return [preUpgradeId];
        }
    }

    @inspectMessage
    inspectMessage(): void {
        if (methodName() === 'getInspectMessageId') {
            if (id().toText() === this.inspectMessageId?.toText()) {
                acceptMessage();
            }
        } else {
            acceptMessage();
        }
    }

    @update([])
    setInspectMessageId(): void {
        this.inspectMessageId = id();
    }

    @query([], IDL.Opt(IDL.Principal))
    getInspectMessageId(): [Principal] | [] {
        if (this.inspectMessageId === null) {
            return [];
        } else {
            return [this.inspectMessageId];
        }
    }

    @query([], IDL.Principal)
    getQueryId(): Principal {
        return id();
    }

    @update([], IDL.Principal)
    getUpdateId(): Principal {
        return id();
    }
}
