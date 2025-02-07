import {
    call,
    canisterSelf,
    heartbeat,
    IDL,
    init,
    inReplicatedExecution,
    inspectMessage,
    postUpgrade,
    preUpgrade,
    query,
    setTimer,
    StableBTreeMap,
    update
} from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    initIsInReplicatedExecution: boolean | null = null;
    postUpgradeIsInReplicatedExecution: boolean | null = null;
    preUpgradeIsInReplicatedExecution = new StableBTreeMap<
        'PRE_UPGRADE_IS_IN_REPLICATED_EXECUTION',
        boolean
    >(0);
    timerIsInReplicatedExecution: boolean | null = null;
    heartbeatIsInReplicatedExecution: boolean | null = null;

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
        setTimer(0n, () => {
            this.timerIsInReplicatedExecution = inReplicatedExecution();
        });
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
            'PRE_UPGRADE_IS_IN_REPLICATED_EXECUTION',
            inReplicatedExecution()
        );
    }

    @query([], IDL.Opt(IDL.Bool))
    getPreUpgradeIsInReplicatedExecution(): [boolean] | [] {
        const preUpgradeIsInReplicatedExecution =
            this.preUpgradeIsInReplicatedExecution.get(
                'PRE_UPGRADE_IS_IN_REPLICATED_EXECUTION'
            );

        if (preUpgradeIsInReplicatedExecution === null) {
            return [];
        } else {
            return [preUpgradeIsInReplicatedExecution];
        }
    }

    @heartbeat
    heartbeat(): void {
        this.heartbeatIsInReplicatedExecution = inReplicatedExecution();
    }

    @query([], IDL.Opt(IDL.Bool))
    getHeartbeatIsInReplicatedExecution(): [boolean] | [] {
        if (this.heartbeatIsInReplicatedExecution === null) {
            return [];
        } else {
            return [this.heartbeatIsInReplicatedExecution];
        }
    }

    @query([], IDL.Opt(IDL.Bool))
    getTimerIsInReplicatedExecution(): [boolean] | [] {
        if (this.timerIsInReplicatedExecution === null) {
            return [];
        } else {
            return [this.timerIsInReplicatedExecution];
        }
    }

    @inspectMessage
    inspectMessage(methodName: string): boolean {
        if (methodName === 'getInspectMessageIsInReplicatedExecution') {
            if (inReplicatedExecution() === true) {
                // TODO for https://github.com/demergent-labs/azle/issues/2539
                return true;
            }

            return false;
        }

        const acceptableMethods = [
            'getQueryInReplicatedModeIsInReplicatedExecution',
            'getUpdateIsInReplicatedExecution'
        ];

        if (acceptableMethods.includes(methodName)) {
            return true;
        }

        return false;
    }

    @update([], IDL.Bool)
    getInspectMessageIsInReplicatedExecution(): boolean {
        return false;
    }

    @query([], IDL.Bool)
    getQueryIsInReplicatedExecution(): boolean {
        return inReplicatedExecution();
    }

    @update([], IDL.Bool)
    async getQueryInReplicatedModeIsInReplicatedExecution(): Promise<boolean> {
        return await call(canisterSelf(), 'getQueryIsInReplicatedExecution', {
            returnIdlType: IDL.Bool
        });
    }

    @query([], IDL.Bool, { composite: true })
    getCompositeQueryIsInReplicatedExecution(): boolean {
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
