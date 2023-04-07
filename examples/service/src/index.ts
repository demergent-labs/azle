import {
    CallResult,
    $query,
    $update,
    Principal,
    Service,
    serviceQuery,
    serviceUpdate,
    Variant,
    Vec
} from 'azle';

class SomeService extends Service {
    @serviceQuery
    query1: () => CallResult<boolean>;

    @serviceUpdate
    update1: () => CallResult<string>;
}

$query;
export function serviceParam(someService: SomeService): SomeService {
    return someService;
}

$query;
export function serviceReturnType(): SomeService {
    return new SomeService(Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'));
}

$update;
export function serviceList(someServices: Vec<SomeService>): Vec<SomeService> {
    return someServices;
}

$update;
export async function serviceCrossCanisterCall(
    someService: SomeService
): Promise<
    Variant<{
        Ok: string;
        Err: string;
    }>
> {
    return await someService.update1().call();
}
