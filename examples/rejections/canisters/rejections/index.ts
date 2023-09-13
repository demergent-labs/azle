import {
    ic,
    Principal,
    RejectionCode,
    Service,
    text,
    update,
    Void
} from 'azle';
import { default as SomeService } from '../some_service';

class Nonexistent extends Service {
    @update([], Void)
    method: () => Void;
}

export default class extends Service {
    nonexistentCanister = new Nonexistent(
        Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
    );

    someService = new SomeService(
        Principal.fromText(
            process.env.SOME_SERVICE_PRINCIPAL ??
                ic.trap('process.env.SOME_SERVICE_PRINCIPAL is undefined')
        )
    );

    @update([], RejectionCode)
    async getRejectionCodeNoError(): Promise<RejectionCode> {
        await ic.call(this.someService.accept);

        return ic.rejectCode();
    }

    @update([], RejectionCode)
    async getRejectionCodeDestinationInvalid(): Promise<RejectionCode> {
        try {
            await ic.call(this.nonexistentCanister.method);
        } catch (error) {}

        return ic.rejectCode();
    }

    @update([], RejectionCode)
    async getRejectionCodeCanisterReject(): Promise<RejectionCode> {
        try {
            await ic.call(this.someService.reject, { args: ['reject'] });
        } catch (error) {}

        return ic.rejectCode();
    }

    @update([], RejectionCode)
    async getRejectionCodeCanisterError(): Promise<RejectionCode> {
        try {
            await ic.call(this.someService.error);
        } catch (error) {}

        return ic.rejectCode();
    }

    @update([text], text)
    async getRejectionMessage(message: text): Promise<text> {
        try {
            await ic.call(this.someService.reject, { args: [message] });
        } catch (error) {}

        return ic.rejectMessage();
    }
}
