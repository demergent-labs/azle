import {
    Canister,
    ic,
    init,
    Principal,
    RejectionCode,
    text,
    update,
    Void
} from 'azle';
import SomeCanister from '../some_canister';

const Nonexistent = Canister({
    method: update([], Void)
});

let someCanister: typeof SomeCanister;
let nonexistentCanister: typeof Nonexistent;

export default Canister({
    init: init([], () => {
        someCanister = SomeCanister(
            Principal.fromText(
                process.env.SOME_CANISTER_PRINCIPAL ??
                    ic.trap('process.env.SOME_CANISTER_PRINCIPAL is undefined')
            )
        );

        nonexistentCanister = Nonexistent(
            Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
        );
    }),
    getRejectionCodeNoError: update([], RejectionCode, async () => {
        await ic.call(someCanister.accept);

        return ic.rejectCode();
    }),
    getRejectionCodeDestinationInvalid: update([], RejectionCode, async () => {
        try {
            await ic.call(nonexistentCanister.method);
        } catch (error) {}

        return ic.rejectCode();
    }),
    getRejectionCodeCanisterReject: update([], RejectionCode, async () => {
        try {
            await ic.call(someCanister.reject, { args: ['reject'] });
        } catch (error) {}

        return ic.rejectCode();
    }),
    getRejectionCodeCanisterError: update([], RejectionCode, async () => {
        try {
            await ic.call(someCanister.error);
        } catch (error) {}

        return ic.rejectCode();
    }),
    getRejectionMessage: update([text], text, async (message: text) => {
        try {
            await ic.call(someCanister.reject, { args: [message] });
        } catch (error) {}

        return ic.rejectMessage();
    })
});
