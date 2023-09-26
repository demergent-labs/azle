import {
    ic,
    init,
    Principal,
    RejectionCode,
    Service,
    text,
    update,
    Void
} from 'azle';
import SomeService from '../some_service';

const Nonexistent = Service({
    method: update([], Void)
});

let someService: typeof SomeService;
let nonexistentCanister: typeof Nonexistent;

export default Service({
    init: init([], () => {
        someService = SomeService(
            Principal.fromText(
                process.env.SOME_SERVICE_PRINCIPAL ??
                    ic.trap('process.env.SOME_SERVICE_PRINCIPAL is undefined')
            )
        );

        nonexistentCanister = Nonexistent(
            Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
        );
    }),
    getRejectionCodeNoError: update([], RejectionCode, async () => {
        await ic.call(someService.accept);

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
            await ic.call(someService.reject, { args: ['reject'] });
        } catch (error) {}

        return ic.rejectCode();
    }),
    getRejectionCodeCanisterError: update([], RejectionCode, async () => {
        try {
            await ic.call(someService.error);
        } catch (error) {}

        return ic.rejectCode();
    }),
    getRejectionMessage: update([text], text, async (message: text) => {
        try {
            await ic.call(someService.reject, { args: [message] });
        } catch (error) {}

        return ic.rejectMessage();
    })
});
