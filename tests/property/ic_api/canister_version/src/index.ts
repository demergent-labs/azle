import {
    acceptMessage,
    canisterVersion,
    IDL,
    init,
    inspectMessage,
    methodName,
    postUpgrade,
    preUpgrade,
    query,
    StableBTreeMap,
    update
} from 'azle';

export default class {
    initCanisterVersion: bigint | null = null;
    postUpgradeCanisterVersion: bigint | null = null;
    preUpgradeCanisterVersion = StableBTreeMap<'PRE_UPGRADE_VERSION', bigint>(
        0
    );
    inspectMessageCanisterVersion: bigint | null = null;
    meaninglessState: bigint = 0n;

    @init([])
    init(): void {
        this.initCanisterVersion = canisterVersion();
    }

    @query([], IDL.Opt(IDL.Int64))
    getInitCanisterVersion(): [bigint] | [] {
        if (this.initCanisterVersion === null) {
            return [];
        } else {
            return [this.initCanisterVersion];
        }
    }

    @postUpgrade([])
    postUpgrade(): void {
        this.postUpgradeCanisterVersion = canisterVersion();
    }

    @query([], IDL.Opt(IDL.Int64))
    getPostUpgradeCanisterVersion(): [bigint] | [] {
        if (this.postUpgradeCanisterVersion === null) {
            return [];
        } else {
            return [this.postUpgradeCanisterVersion];
        }
    }

    @preUpgrade
    preUpgrade(): void {
        this.preUpgradeCanisterVersion.insert(
            'PRE_UPGRADE_VERSION',
            canisterVersion()
        );
    }

    @query([], IDL.Opt(IDL.Int64))
    getPreUpgradeCanisterVersion(): [bigint] | [] {
        const preUpgradeCanisterVersion = this.preUpgradeCanisterVersion.get(
            'PRE_UPGRADE_VERSION'
        );

        if (preUpgradeCanisterVersion === null) {
            return [];
        } else {
            return [preUpgradeCanisterVersion];
        }
    }

    @inspectMessage
    inspectMessage(): void {
        if (methodName() === 'getInspectMessageCanisterVersion') {
            if (canisterVersion() === this.inspectMessageCanisterVersion) {
                acceptMessage();
            }
        } else {
            acceptMessage();
        }
    }

    @update([])
    setInspectMessageCanisterVersion(): void {
        this.inspectMessageCanisterVersion = canisterVersion();
    }

    @query([], IDL.Opt(IDL.Int64))
    getInspectMessageCanisterVersion(): [bigint] | [] {
        if (this.inspectMessageCanisterVersion === null) {
            return [];
        } else {
            return [this.inspectMessageCanisterVersion];
        }
    }

    @query([], IDL.Int64)
    getQueryCanisterVersion(): bigint {
        return canisterVersion();
    }

    @update([], IDL.Int64)
    getUpdateCanisterVersion(): bigint {
        const version = canisterVersion();
        this.meaninglessState = 1n;
        return version;
    }
}
