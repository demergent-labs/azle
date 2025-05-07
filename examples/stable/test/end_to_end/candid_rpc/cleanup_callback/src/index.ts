import { call, IDL, query, trap, update } from 'azle';

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

    @update
    deleteAzleGlobalSettleCallbacks(): void {
        globalThis._azleRejectCallbacks = {};
        globalThis._azleResolveCallbacks = {};
    }
}
