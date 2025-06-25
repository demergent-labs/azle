import {
    canisterCycleBalance,
    canisterSelf,
    canisterVersion,
    certifiedDataSet,
    dataCertificate,
    IDL,
    isController,
    msgArgData,
    msgCaller,
    msgReject,
    performanceCounter,
    Principal,
    query,
    time,
    trap,
    update
} from 'azle';

export default class {
    // returns the argument data as bytes.
    @query([IDL.Vec(IDL.Nat8), IDL.Int8, IDL.Bool, IDL.Text], IDL.Vec(IDL.Nat8))
    msgArgData(
        _arg1: Uint8Array,
        _arg2: number,
        _arg3: boolean,
        _arg4: string
    ): Uint8Array {
        return msgArgData();
    }

    // returns the principal of the identity that called this function
    @query([], IDL.Principal)
    msgCaller(): Principal {
        return msgCaller();
    }

    // returns the amount of cycles available in the canister
    @query([], IDL.Nat)
    canisterCycleBalance(): bigint {
        return canisterCycleBalance();
    }

    // returns the canister's version number
    @query([], IDL.Nat64)
    canisterVersion(): bigint {
        return canisterVersion();
    }

    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    dataCertificate(): [Uint8Array] | [] {
        const result = dataCertificate();

        if (result === undefined) {
            return [];
        }

        return [result];
    }

    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    @update([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    dataCertificateNull(): [Uint8Array] | [] {
        const result = dataCertificate();

        if (result === undefined) {
            return [];
        }

        return [result];
    }

    // returns this canister's id
    @query([], IDL.Principal)
    canisterSelf(): Principal {
        return canisterSelf();
    }

    // determines whether the given principal is a controller of the canister
    @query([IDL.Principal], IDL.Bool)
    isController(principal: Principal): boolean {
        return isController(principal);
    }

    @query([], IDL.Nat64)
    performanceCounter(): bigint {
        return performanceCounter(0);
    }

    @query([IDL.Text], IDL.Empty, { manual: true })
    msgReject(): void {
        const argData = msgArgData();

        const message = IDL.decode(
            [IDL.Text],
            argData.buffer instanceof ArrayBuffer
                ? argData.buffer
                : new Uint8Array(argData).buffer
        )[0] as string;

        msgReject(message);
    }

    // sets up to 32 bytes of certified data
    @update([IDL.Vec(IDL.Nat8)])
    certifiedDataSet(data: Uint8Array): void {
        certifiedDataSet(data);
    }

    // returns the current timestamp
    @query([], IDL.Nat64)
    time(): bigint {
        return time();
    }

    // traps with a message, stopping execution and discarding all state within the call
    @query([IDL.Text], IDL.Bool)
    trap(message: string): boolean {
        trap(message);
    }
}
