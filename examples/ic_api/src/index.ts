import {
    blob,
    empty,
    ic,
    int8,
    Manual,
    nat,
    nat32,
    nat64,
    Opt,
    Principal,
    query,
    update,
    Service,
    bool,
    text,
    principal,
    Void
} from 'azle';

// TODO: See https://github.com/demergent-labs/azle/issues/496
// type ArgDataMultipleParamsResult = {
//     blob: blob;
//     int: int8;
//     boolean: bool;
//     string: text;
// };

export default class extends Service {
    // // returns the argument data as an array.
    // argDataZeroParams(): Vec<null> {
    //     return ic.argData();
    // }
    //
    // // returns the argument data as an array.
    // argDataOneParam(arg: bool): bool {
    //     const argData = ic.argData();
    //     return argData[0];
    // }
    //
    // // returns the argument data as an array.
    // argDataMultipleParams(
    //     arg1: blob,
    //     arg2: int8,
    //     arg3: bool,
    //     arg4: text
    // ): ArgDataMultipleParamsResult {
    //     const argData = ic.argData();
    //     return {
    //         blob: Uint8Array.from(argData[0]),
    //         int: argData[1],
    //         boolean: argData[2],
    //         string: argData[3]
    //     };
    // }

    // returns the argument data as bytes.
    @query([blob, int8, bool, text], blob)
    argDataRaw(arg1: blob, arg2: int8, arg3: bool, arg4: text): blob {
        return ic.argDataRaw();
    }

    // returns the length of the argument data in bytes
    @query([blob, int8, bool, text], nat32)
    argDataRawSize(arg1: blob, arg2: int8, arg3: bool, arg4: text): nat32 {
        return ic.argDataRawSize();
    }

    // returns the principal of the identity that called this function
    @query([], principal)
    caller(): Principal {
        return ic.caller();
    }

    // returns the amount of cycles available in the canister
    @query([], nat64)
    canisterBalance(): nat64 {
        return ic.canisterBalance();
    }

    // returns the amount of cycles available in the canister
    @query([], nat)
    canisterBalance128(): nat {
        return ic.canisterBalance128();
    }

    // returns the canister's version number
    @query([], nat64)
    canisterVersion(): nat64 {
        return ic.canisterVersion();
    }

    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    @query([], Opt(blob))
    dataCertificate(): Opt<blob> {
        return ic.dataCertificate();
    }

    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    @update([], Opt(blob))
    dataCertificateNull(): Opt<blob> {
        return ic.dataCertificate();
    }

    // returns this canister's id
    @query([], principal)
    id(): Principal {
        return ic.id();
    }

    // Returns the number of instructions that the canister executed since the last
    // entry point.
    @query([], nat64)
    instructionCounter(): nat64 {
        return ic.instructionCounter();
    }

    // determines whether the given principal is a controller of the canister
    @query([principal], bool)
    isController(principal: Principal): bool {
        return ic.isController(principal);
    }

    @query([], nat64)
    performanceCounter(): nat64 {
        return ic.performanceCounter(0);
    }

    // prints a message through the local replica's output
    @query([text], bool)
    print(message: text): bool {
        ic.print(message);

        return true;
    }

    @query([text], empty, { manual: true })
    reject(message: text): Manual<empty> {
        ic.reject(message);
    }

    // sets up to 32 bytes of certified data
    @update([blob], Void)
    setCertifiedData(data: blob): Void {
        ic.setCertifiedData(data);
    }

    // returns the current timestamp
    @query([], nat64)
    time(): nat64 {
        return ic.time();
    }

    // traps with a message, stopping execution and discarding all state within the call
    @query([text], bool)
    trap(message: text): bool {
        ic.trap(message);

        return true;
    }
}
