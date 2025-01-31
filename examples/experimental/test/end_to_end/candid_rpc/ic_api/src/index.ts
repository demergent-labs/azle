import {
    canisterCycleBalance,
    canisterSelf,
    canisterVersion,
    dataCertificate,
    isController,
    msgArgData,
    msgCaller,
    msgReject,
    performanceCounter,
    setCertifiedData,
    time,
    trap
} from 'azle';
import {
    blob,
    bool,
    Canister,
    empty,
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

export default Canister({
    // returns the argument data as bytes.
    msgArgData: query(
        [blob, int8, bool, text],
        blob,
        (_arg1, _arg2, _arg3, _arg4) => {
            return msgArgData();
        }
    ),
    // returns the principal of the identity that called this function
    msgCaller: query([], Principal, () => {
        return msgCaller();
    }),
    // returns the amount of cycles available in the canister
    canisterCycleBalance: query([], nat, () => {
        return canisterCycleBalance();
    }),
    // returns the canister's version number
    canisterVersion: query([], nat64, () => {
        return canisterVersion();
    }),
    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    dataCertificate: query([], Opt(blob), () => {
        const cert = dataCertificate();
        return cert === undefined ? { None: null } : { Some: cert };
    }),
    // When called from a query call, returns the data certificate
    // authenticating certified data set by this canister. Otherwise returns
    // None.
    dataCertificateNull: update([], Opt(blob), () => {
        const cert = dataCertificate();
        return cert === undefined ? { None: null } : { Some: cert };
    }),
    // returns this canister's id
    canisterSelf: query([], Principal, () => {
        return canisterSelf();
    }),
    // determines whether the given principal is a controller of the canister
    isController: query([Principal], bool, (principal) => {
        return isController(principal);
    }),
    performanceCounter: query([], nat64, () => {
        return performanceCounter(0);
    }),
    msgReject: query(
        [text],
        Manual(empty),
        (message) => {
            msgReject(message);
        },
        { manual: true }
    ),
    // sets up to 32 bytes of certified data
    setCertifiedData: update([blob], Void, (data) => {
        setCertifiedData(data);
    }),
    // returns the current timestamp
    time: query([], nat64, () => {
        return time();
    }),
    // traps with a message, stopping execution and discarding all state within the call
    trap: query([text], bool, (message) => {
        trap(message);

        return true;
    })
});
