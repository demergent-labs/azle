import {
    call,
    chunk,
    IDL,
    msgReject,
    query,
    setTimer,
    trap,
    update
} from 'azle';

export default class {
    rejectCode: number = 0;
    rejectMessage: string = 'no error';

    @query([], IDL.Nat32)
    getRejectCode(): number {
        return this.rejectCode;
    }

    @query([], IDL.Text)
    getRejectMessage(): string {
        return this.rejectMessage;
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRandomness(): Promise<Uint8Array> {
        return await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
            returnIdlType: IDL.Vec(IDL.Nat8)
        });
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessWithTrapUncaught(): Promise<Uint8Array> {
        const result = await call<undefined, Uint8Array>(
            'aaaaa-aa',
            'raw_rand',
            {
                returnIdlType: IDL.Vec(IDL.Nat8)
            }
        );

        trap('trapped from getRandomnessWithTrapUncaught');

        return result;
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessWithTrapCaught(): Promise<Uint8Array> {
        this.rejectCode = 0;
        this.rejectMessage = 'no error';

        try {
            const result = await call<undefined, Uint8Array>(
                'aaaaa-aa',
                'raw_rand',
                {
                    returnIdlType: IDL.Vec(IDL.Nat8)
                }
            );

            trap('trapped from getRandomnessWithTrapCaught');

            return result;
        } catch (error: any) {
            this.rejectCode = error.rejectCode;
            this.rejectMessage = error.rejectMessage;

            throw error;
        }
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessWithTrapCaughtRejectCallback(): Promise<Uint8Array> {
        this.rejectCode = 0;
        this.rejectMessage = 'no error';

        try {
            const result = await call<undefined, Uint8Array>(
                'aaaaa-aa',
                'candyland',
                {
                    returnIdlType: IDL.Vec(IDL.Nat8)
                }
            );

            return result;
        } catch (error: any) {
            if (
                error.type === 'CleanupCallback' &&
                error.rejectCode === 10_001 &&
                error.rejectMessage === 'executing within cleanup callback'
            ) {
                this.rejectCode = error.rejectCode;
                this.rejectMessage = error.rejectMessage;

                throw error;
            } else {
                throw new Error(`executing within the reject callback`);
            }
        }
    }

    @update([], IDL.Vec(IDL.Nat8))
    getRandomnessWithTrapCaughtPromise(): Promise<Uint8Array> {
        this.rejectCode = 0;
        this.rejectMessage = 'no error';

        return call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
            returnIdlType: IDL.Vec(IDL.Nat8)
        })
            .then((result) => {
                trap('trapped from getRandomnessWithTrapCaughtPromise');

                return result;
            })
            .catch((error: any) => {
                this.rejectCode = error.rejectCode;
                this.rejectMessage = error.rejectMessage;

                throw error;
            });
    }

    @update([], IDL.Vec(IDL.Nat8))
    async getRandomnessWithTrapCaughtAndTrapAgain(): Promise<Uint8Array> {
        this.rejectCode = 0;
        this.rejectMessage = 'no error';

        try {
            const result = await call<undefined, Uint8Array>(
                'aaaaa-aa',
                'raw_rand',
                {
                    returnIdlType: IDL.Vec(IDL.Nat8)
                }
            );

            trap('trapped from getRandomnessWithTrapCaughtAndTrapAgain');

            return result;
        } catch (error: any) {
            this.rejectCode = error.rejectCode;
            this.rejectMessage = error.rejectMessage;

            throw new Error(
                `You cannot allow a trap to occur in a cleanup callback`
            );
        }
    }

    @update([], undefined, { manual: true })
    async getRandomnessMsgRejectInReplyCallback(): Promise<void> {
        try {
            await call<undefined, Uint8Array>('aaaaa-aa', 'raw_rand', {
                returnIdlType: IDL.Vec(IDL.Nat8)
            });

            msgReject(
                'calling msgReject from getRandomnessMsgRejectInReplyCallback'
            );
        } catch {
            trap(`an error should not have been thrown`);
        }
    }

    @update([], undefined, { manual: true })
    async getRandomnessMsgRejectInRejectCallback(): Promise<void> {
        try {
            await call<undefined, Uint8Array>('aaaaa-aa', 'candyland', {
                returnIdlType: IDL.Vec(IDL.Nat8)
            });

            trap(`an error should have been thrown`);
        } catch (error: any) {
            if (
                error.type === 'CleanupCallback' &&
                error.rejectCode === 10_001 &&
                error.rejectMessage === 'executing within cleanup callback'
            ) {
                trap(`the cleanup callback should not have been called`);
            }

            msgReject(
                'calling msgReject from getRandomnessMsgRejectInRejectCallback'
            );
        }
    }

    @update([], IDL.Bool)
    setTimerWithTrap(): boolean {
        setTimer(0, () => {
            trap('trapped from setTimerWithTrap');
        });

        return true;
    }

    @update([], IDL.Bool)
    setTimerWithTrapAndInterCanisterCall(): boolean {
        setTimer(0, async () => {
            await chunk();

            trap('trapped from setTimerWithTrapAndInterCanisterCall');
        });

        return true;
    }

    @update([], IDL.Bool)
    setTimerWithTrapAndInterCanisterCalls(): boolean {
        setTimer(0, async () => {
            await chunk();
            await chunk();
            await chunk();

            trap('trapped from setTimerWithTrapAndInterCanisterCalls');
        });

        return true;
    }

    @update
    deleteAzleGlobalSettleCallbacks(): void {
        globalThis._azleRejectCallbacks = {};
        globalThis._azleResolveCallbacks = {};
    }
}
