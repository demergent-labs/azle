import { caller, IDL, query, update } from 'azle';

// TODO: See https://github.com/demergent-labs/azle/issues/496
// const ArgDataMultipleParamsResult = Record({
//     blob: IDL.Vec(IDL.Nat8),
//     int: int8,
//     boolean: bool,
//     string: text,
// });

export default class {
    // // returns the argument data as an array.
    @query([], Vec(Null))
    argDataZeroParams() {
        return ic.argData();
    }

    // // returns the argument data as an array.
    @query([bool], bool)
    argDataOneParam() {
        return ic.argData()[0];
    }

    // returns the argument data as an array.
    @query([IDL.Vec(IDL.Nat8), int8, bool, text], ArgDataMultipleParamsResult)
    argDataMultipleParams(_arg1, _arg2, _arg3, _arg4) {
        const argData = ic.argData();
        return {
            blob: Uint8Array.from(argData[0]),
            int: argData[1],
            boolean: argData[2],
            string: argData[3]
        };
    }

    // returns the argument data as bytes.
    @query([IDL.Vec(IDL.Nat8), int8, bool, text], IDL.Vec(IDL.Nat8))
    argDataRaw(_arg1, _arg2, _arg3, _arg4) {
        return ic.argDataRaw();
    }
    // returns the length of the argument data in bytes
    @query([IDL.Vec(IDL.Nat8), int8, bool, text], nat32)
    argDataRawSize(_arg1, _arg2, _arg3, _arg4) {
        return ic.argDataRawSize();
    }
    // returns the principal of the identity that called this function
    @query([], Principal)
    caller() {
        return caller();
    }
    // returns the amount of cycles available in the canister
    @query([], nat64)
    canisterBalance() {
        return ic.canisterBalance();
    }
    // returns the amount of cycles available in the canister
    @query([], nat)
    canisterBalance128() {
        return ic.canisterBalance128();
    }
    // returns the canister's version number
    @query([], nat64)
    canisterVersion() {
        return ic.canisterVersion();
    }
    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    @query([], Opt(IDL.Vec(IDL.Nat8)))
    dataCertificate() {
        return ic.dataCertificate();
    }
    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    @update([], Opt(IDL.Vec(IDL.Nat8)))
    dataCertificateNull() {
        return ic.dataCertificate();
    }
    // returns this canister's id
    @query([], Principal)
    id() {
        return ic.id();
    }
    // Returns the number of instructions that the canister executed since the last
    // entry point.
    @query([], nat64)
    instructionCounter() {
        return ic.instructionCounter();
    }
    // determines whether the given principal is a controller of the canister
    @query([Principal], bool)
    isController(principal) {
        return ic.isController(principal);
    }
    @query([], nat64)
    performanceCounter() {
        return ic.performanceCounter(0);
    }
    // prints a message through the local replica's output
    @query([text], bool)
    print(message) {
        ic.print(message);

        return true;
    }
    @query([text], empty { manual: true })
    reject(message) {
        ic.reject(message);
    }
    // sets up to 32 bytes of certified data
    @update([IDL.Vec(IDL.Nat8)], Void)
    setCertifiedData(data) {
        ic.setCertifiedData(data);
    }
    // returns the current timestamp
    @query([], nat64)
    time() {
        return ic.time();
    }
    // traps with a message, stopping execution and discarding all state within the call
    @query([text], bool)
    trap(message) {
        ic.trap(message);

        return true;
    }
}
