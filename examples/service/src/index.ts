import { ic, Principal, query, Record, Service, text, update, Vec } from 'azle';
import SomeService from './some_service';

const Wrapper = Record({
    someService: SomeService
});

export default Service({
    serviceParam: query([SomeService], SomeService, (someService) => {
        return someService;
    }),
    serviceReturnType: query([], SomeService, () => {
        return SomeService(
            Principal.fromText(
                process.env.SOME_SERVICE_PRINCIPAL ??
                    ic.trap('process.env.SOME_SERVICE_PRINCIPAL is undefined')
            )
        );
    }),
    serviceNestedReturnType: update([], Wrapper, () => {
        return {
            someService: SomeService(
                Principal.fromText(
                    process.env.SOME_SERVICE_PRINCIPAL ??
                        ic.trap(
                            'process.env.SOME_SERVICE_PRINCIPAL is undefined'
                        )
                )
            )
        };
    }),
    serviceList: update(
        [Vec(SomeService)],
        Vec(SomeService),
        (someServices) => {
            return someServices;
        }
    ),
    serviceCrossCanisterCall: update(
        [SomeService],
        text,
        async (someService) => {
            return await ic.call(someService.update1);
        }
    )
});
