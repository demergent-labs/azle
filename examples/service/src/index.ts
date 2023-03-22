import { CanisterResult, $query, query, ExternalCanister } from 'azle';

class MyService extends ExternalCanister {
    @query
    method1: () => CanisterResult<string>;
}

$query;
export function test(myService: MyService): MyService {
    return myService;
}
