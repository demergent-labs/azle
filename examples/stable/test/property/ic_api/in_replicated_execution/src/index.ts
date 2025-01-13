import {
    acceptMessage,
    IDL,
    init,
    inReplicatedExecution,
    inspectMessage,
    methodName,
    postUpgrade,
    preUpgrade,
    query,
    StableBTreeMap,
    update
} from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    initIsInReplicatedExecution: boolean | null = null;
    postUpgradeIsInReplicatedExecution: boolean | null = null;
    preUpgradeIsInReplicatedExecution = new StableBTreeMap<
        'PRE_UPGRADE_VERSION',
        boolean
    >(0);
    inspectMessageIsInReplicatedExecution: boolean | null = null;

    @init
    init(): void {
        this.initIsInReplicatedExecution = inReplicatedExecution();
    }

    @query([], IDL.Opt(IDL.Bool))
    getInitIsInReplicatedExecution(): [boolean] | [] {
        if (this.initIsInReplicatedExecution === null) {
            return [];
        } else {
            return [this.initIsInReplicatedExecution];
        }
    }

    @postUpgrade
    postUpgrade(): void {
        this.postUpgradeIsInReplicatedExecution = inReplicatedExecution();
    }

    @query([], IDL.Opt(IDL.Bool))
    getPostUpgradeIsInReplicatedExecution(): [boolean] | [] {
        if (this.postUpgradeIsInReplicatedExecution === null) {
            return [];
        } else {
            return [this.postUpgradeIsInReplicatedExecution];
        }
    }

    @preUpgrade
    preUpgrade(): void {
        this.preUpgradeIsInReplicatedExecution.insert(
            'PRE_UPGRADE_VERSION',
            inReplicatedExecution()
        );
    }

    @query([], IDL.Opt(IDL.Bool))
    getPreUpgradeIsInReplicatedExecution(): [boolean] | [] {
        const preUpgradeIsInReplicatedExecution =
            this.preUpgradeIsInReplicatedExecution.get('PRE_UPGRADE_VERSION');

        if (preUpgradeIsInReplicatedExecution === null) {
            return [];
        } else {
            return [preUpgradeIsInReplicatedExecution];
        }
    }

    @inspectMessage
    inspectMessage(): void {
        if (methodName() === 'getInspectMessageIsInReplicatedExecution') {
            if (
                inReplicatedExecution() ===
                this.inspectMessageIsInReplicatedExecution
            ) {
                acceptMessage();
            }
        } else {
            acceptMessage();
        }
    }

    @update
    setInspectMessageIsInReplicatedExecution(): void {
        this.inspectMessageIsInReplicatedExecution = inReplicatedExecution();
    }

    @query([], IDL.Opt(IDL.Bool))
    getInspectMessageIsInReplicatedExecution(): [boolean] | [] {
        if (this.inspectMessageIsInReplicatedExecution === null) {
            return [];
        } else {
            return [this.inspectMessageIsInReplicatedExecution];
        }
    }

    @query([], IDL.Bool)
    getQueryIsInReplicatedExecution(): boolean {
        return inReplicatedExecution();
    }

    @update([], IDL.Bool)
    getUpdateIsInReplicatedExecution(): boolean {
        return inReplicatedExecution();
    }

    @query([], IDL.Bool)
    assertTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof inReplicatedExecution>, boolean>
        >;
        return typeof inReplicatedExecution() === 'boolean';
    }
}
