import {
    CanisterResult,
    $query,
    $update,
    query,
    update,
    ExternalCanister,
    Principal,
    Variant
} from 'azle';

class SomeService extends ExternalCanister {
    @query
    query1: () => CanisterResult<boolean>;

    @update
    update1: () => CanisterResult<string>;
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
export function serviceList(someServices: SomeService[]): SomeService[] {
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
