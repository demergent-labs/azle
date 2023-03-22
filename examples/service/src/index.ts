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

class ExternalService extends ExternalCanister {
    @query
    query1: () => CanisterResult<boolean>;

    @update
    update1: () => CanisterResult<string>;
}

$query;
export function serviceParam(
    externalService: ExternalService
): ExternalService {
    return externalService;
}

$query;
export function serviceReturnType(): ExternalService {
    return new ExternalService(Principal.fromText('aaaaa-aa'));
}

$update;
export async function serviceCrossCanisterCall(
    externalService: ExternalService
): Promise<
    Variant<{
        Ok: string;
        Err: string;
    }>
> {
    return await externalService.update1().call();
}
