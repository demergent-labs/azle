import { IDL, isController, Principal, query, update } from 'azle';

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
    isControllerTypesAreCorrect(principal: Principal): boolean {
        return typeof isController(principal) === 'boolean';
    }
}
