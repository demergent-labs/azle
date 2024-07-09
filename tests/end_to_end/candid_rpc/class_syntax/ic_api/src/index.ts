import {
    argDataRaw,
    argDataRawSize,
    caller,
    canisterBalance,
    canisterBalance128,
    canisterVersion,
    dataCertificate,
    id,
    IDL,
    instructionCounter,
    isController,
    performanceCounter,
    Principal,
    print as icPrint,
    query,
    reject,
    setCertifiedData,
    time,
    trap,
    update
} from 'azle';

// TODO: See https://github.com/demergent-labs/azle/issues/496
// TODO this and related stuff should be commented out after it's converted to class syntax
// const ArgDataMultipleParamsResult = IDL.Record({
//     blob: IDL.Vec(IDL.Nat8),
//     int: IDL.Int8,
//     boolean: IDL.Bool,
//     string: IDL.Text,
// });
// type ArgDataMultipleParamsResult = {
//     blob: Uint8Array,
//     int: bigint,
//     boolean: boolean,
//     string: string
// }

export default class {
    // // returns the argument data as an array.
    // @query([], IDL.Vec(IDL.Null))
    // argDataZeroParams(): null[] {
    //     return argData();
    // }

    // // returns the argument data as an array.
    // @query([IDL.Bool], IDL.Bool)
    // argDataOneParam(): boolean {
    //     return argData()[0];
    // }

    // returns the argument data as an array.
    // @query([IDL.Vec(IDL.Nat8), IDL.Int8, IDL.Bool, IDL.Text], ArgDataMultipleParamsResult)
    // argDataMultipleParams(_arg1: Uint8Array, _arg2: number, _arg3: boolean, _arg4: string): ArgDataMultipleParamsResult {
    //     const data = argData();
    //     return {
    //         blob: Uint8Array.from(data[0]),
    //         int: data[1],
    //         boolean: data[2],
    //         string: data[3]
    //     };
    // }

    // returns the argument data as bytes.
    @query([IDL.Vec(IDL.Nat8), IDL.Int8, IDL.Bool, IDL.Text], IDL.Vec(IDL.Nat8))
    argDataRaw(
        _arg1: Uint8Array,
        _arg2: number,
        _arg3: boolean,
        _arg4: string
    ): Uint8Array {
        return argDataRaw();
    }

    // returns the length of the argument data in bytes
    @query([IDL.Vec(IDL.Nat8), IDL.Int8, IDL.Bool, IDL.Text], IDL.Nat32)
    argDataRawSize(
        _arg1: Uint8Array,
        _arg2: number,
        _arg3: boolean,
        _arg4: string
    ): number {
        return argDataRawSize();
    }

    // returns the principal of the identity that called this function
    @query([], IDL.Principal)
    caller(): Principal {
        return caller();
    }

    // returns the amount of cycles available in the canister
    @query([], IDL.Nat64)
    canisterBalance(): bigint {
        return canisterBalance();
    }

    // returns the amount of cycles available in the canister
    @query([], IDL.Nat)
    canisterBalance128(): bigint {
        return canisterBalance128();
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
        return dataCertificate();
    }

    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    @update([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    dataCertificateNull(): [Uint8Array] | [] {
        return dataCertificate();
    }

    // returns this canister's id
    @query([], IDL.Principal)
    id(): Principal {
        return id();
    }

    // Returns the number of instructions that the canister executed since the last
    // entry point.
    @query([], IDL.Nat64)
    instructionCounter(): bigint {
        return instructionCounter();
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

    // prints a message through the local replica's output
    @query([IDL.Text], IDL.Bool)
    print(message: string): boolean {
        icPrint(message);

        return true;
    }

    @query([IDL.Text], IDL.Empty, { manual: true })
    reject(message: string): void {
        reject(message);
    }

    // sets up to 32 bytes of certified data
    @update([IDL.Vec(IDL.Nat8)])
    setCertifiedData(data: Uint8Array): void {
        setCertifiedData(data);
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
