import {
    candid,
    ic,
    Principal,
    query,
    Record,
    Service,
    text,
    update,
    Vec
} from 'azle';

import { default as SomeService } from './some_service';

class Wrapper extends Record {
    @candid(SomeService)
    someService: SomeService;
}

export default class extends Service {
    @query([SomeService], SomeService)
    serviceParam(someService: SomeService): SomeService {
        return someService;
    }

    @query([], SomeService)
    serviceReturnType(): SomeService {
        return new SomeService(
            Principal.fromText(
                process.env.SOME_SERVICE_PRINCIPAL ??
                    ic.trap('process.env.SOME_SERVICE_PRINCIPAL is undefined')
            )
        );
    }

    @update([], Wrapper)
    serviceNestedReturnType(): Wrapper {
        return {
            someService: new SomeService(
                Principal.fromText(
                    process.env.SOME_SERVICE_PRINCIPAL ??
                        ic.trap(
                            'process.env.SOME_SERVICE_PRINCIPAL is undefined'
                        )
                )
            )
        };
    }

    @update([Vec(SomeService)], Vec(SomeService))
    serviceList(someServices: Vec<SomeService>): Vec<SomeService> {
        return someServices;
    }

    @update([SomeService], text)
    async serviceCrossCanisterCall(someService: SomeService): Promise<text> {
        return await ic.call(someService.update1);
    }
}
