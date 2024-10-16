import {
    blob,
    bool,
    Canister,
    empty,
    ic,
    int8,
    Manual,
    nat,
    nat64,
    Opt,
    Principal,
    query,
    text,
    update,
    Void
} from 'azle/experimental';

// TODO: See https://github.com/demergent-labs/azle/issues/496
// const ArgDataMultipleParamsResult = Record({
//     blob: blob,
//     int: int8,
//     boolean: bool,
//     string: text,
// });

export default Canister({
    // // returns the argument data as an array.
    // argDataZeroParams: query([], Vec(Null), () => {
    //     return ic.argData();
    // }),

    // // returns the argument data as an array.
    // argDataOneParam: query([bool], bool, () => {
    //     return ic.argData()[0];
    // }),

    // // returns the argument data as an array.
    // argDataMultipleParams: query(
    //     [blob, int8, bool, text],
    //     ArgDataMultipleParamsResult,
    //     (_arg1, _arg2, _arg3, _arg4) => {
    //         const argData = ic.argData();
    //         return {
    //             blob: Uint8Array.from(argData[0]),
    //             int: argData[1],
    //             boolean: argData[2],
    //             string: argData[3]
    //         };
    //     }
    // ),

    // returns the argument data as bytes.
    argDataRaw: query(
        [blob, int8, bool, text],
        blob,
        (_arg1, _arg2, _arg3, _arg4) => {
            return ic.argDataRaw();
        }
    ),
    // returns the principal of the identity that called this function
    caller: query([], Principal, () => {
        return ic.caller();
    }),
    // returns the amount of cycles available in the canister
    canisterBalance: query([], nat, () => {
        return ic.canisterBalance();
    }),
    // returns the canister's version number
    canisterVersion: query([], nat64, () => {
        return ic.canisterVersion();
    }),
    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    dataCertificate: query([], Opt(blob), () => {
        return ic.dataCertificate();
    }),
    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    dataCertificateNull: update([], Opt(blob), () => {
        return ic.dataCertificate();
    }),
    // returns this canister's id
    id: query([], Principal, () => {
        return ic.id();
    }),
    // Returns the number of instructions that the canister executed since the last
    // entry point.
    instructionCounter: query([], nat64, () => {
        return ic.instructionCounter();
    }),
    // determines whether the given principal is a controller of the canister
    isController: query([Principal], bool, (principal) => {
        return ic.isController(principal);
    }),
    performanceCounter: query([], nat64, () => {
        return ic.performanceCounter(0);
    }),
    // prints a message through the local replica's output
    print: query([text], bool, (message) => {
        ic.print(message);

        return true;
    }),
    reject: query(
        [text],
        Manual(empty),
        (message) => {
            ic.reject(message);
        },
        { manual: true }
    ),
    // sets up to 32 bytes of certified data
    setCertifiedData: update([blob], Void, (data) => {
        ic.setCertifiedData(data);
    }),
    // returns the current timestamp
    time: query([], nat64, () => {
        return ic.time();
    }),
    // traps with a message, stopping execution and discarding all state within the call
    trap: query([text], bool, (message) => {
        ic.trap(message);

        return true;
    })
});
