import {
    call,
    canisterCycleBalance,
    IDL,
    msgCyclesRefunded,
    query,
    update
} from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

import { CyclesResult } from '../types';

export default class {
    cyclesPrincipal = getCyclesPrincipal();

    @update([IDL.Nat64], CyclesResult)
    async sendAllCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call<undefined, CyclesResult>(
            this.cyclesPrincipal,
            'receiveAllCycles',
            {
                returnIdlType: CyclesResult,
                cycles: amount
            }
        );
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64, IDL.Nat64], CyclesResult)
    async sendVariableCycles(
        amountToSend: bigint,
        amountToAccept: bigint
    ): Promise<CyclesResult> {
        const result = await call<[bigint], CyclesResult>(
            this.cyclesPrincipal,
            'receiveVariableCycles',
            {
                paramIdlTypes: [IDL.Nat64],
                returnIdlType: CyclesResult,
                args: [amountToAccept],
                cycles: amountToSend
            }
        );
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64], CyclesResult)
    async sendNoCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call<undefined, CyclesResult>(
            this.cyclesPrincipal,
            'receiveNoCycles',
            {
                returnIdlType: CyclesResult,
                cycles: amount
            }
        );
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64, IDL.Nat64], CyclesResult)
    async sendCyclesByChunk(
        amount: bigint,
        numChunks: bigint
    ): Promise<CyclesResult> {
        const result = await call<[bigint], CyclesResult>(
            this.cyclesPrincipal,
            'receiveCyclesByChunk',
            {
                paramIdlTypes: [IDL.Nat64],
                returnIdlType: CyclesResult,
                args: [numChunks],
                cycles: amount
            }
        );
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @query([], IDL.Bool)
    assertCanisterCycleBalanceTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof canisterCycleBalance>, bigint>
        >;
        return typeof canisterCycleBalance() === 'bigint';
    }

    @update([IDL.Nat64], IDL.Bool)
    async assertMsgCyclesAcceptTypes(amount: bigint): Promise<boolean> {
        return await call<[bigint], boolean>(
            this.cyclesPrincipal,
            'assertMsgCyclesAcceptTypes',
            {
                paramIdlTypes: [IDL.Nat64],
                returnIdlType: IDL.Bool,
                args: [amount]
            }
        );
    }

    @update([], IDL.Bool)
    async assertMsgCyclesAvailableTypes(): Promise<boolean> {
        return await call<undefined, boolean>(
            this.cyclesPrincipal,
            'assertMsgCyclesAvailableTypes',
            {
                returnIdlType: IDL.Bool
            }
        );
    }

    @update([IDL.Nat64], IDL.Bool)
    async assertMsgCyclesRefundedTypes(amount: bigint): Promise<boolean> {
        await call<[bigint], boolean>(
            this.cyclesPrincipal,
            'assertMsgCyclesAcceptTypes',
            {
                paramIdlTypes: [IDL.Nat64],
                returnIdlType: IDL.Bool,
                args: [amount]
            }
        );
        // NOTE: if there is no cross canister call, msgCyclesRefunded() cannot be called
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof msgCyclesRefunded>, bigint>
        >;
        return typeof msgCyclesRefunded() === 'bigint';
    }
}

function getCyclesPrincipal(): string {
    if (process.env.CYCLES_PRINCIPAL !== undefined) {
        return process.env.CYCLES_PRINCIPAL;
    }
    throw new Error('process.env.CYCLES_PRINCIPAL is undefined');
}
