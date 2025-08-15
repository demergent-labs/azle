import { IDL, isController, Principal, query, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/_internal/test/assert_type';

export default class {
    @query([IDL.Principal], IDL.Bool)
    queryIsController(principal: Principal): boolean {
        return isController(principal);
    }

    @update([IDL.Principal], IDL.Bool)
    updateIsController(principal: Principal): boolean {
        return isController(principal);
    }

    @query([IDL.Principal], IDL.Bool)
    assertTypes(principal: Principal): boolean {
        type _AssertParamType = AssertType<
            NotAnyAndExact<Parameters<typeof isController>[0], Principal>
        >;
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof isController>, boolean>
        >;
        return (
            principal instanceof Principal &&
            typeof isController(principal) === 'boolean'
        );
    }
}
