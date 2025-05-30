import '#experimental/lib/assert_experimental';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
// To achieve the developer facing type inference API we often introduce type
// parameters that are used by the consumer of the function but not by the
// function itself
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type CanisterMethodInfo<T extends ReadonlyArray<any>, K> = {
    mode:
        | 'query'
        | 'update'
        | 'init'
        | 'heartbeat'
        | 'inspectMessage'
        | 'postUpgrade'
        | 'preUpgrade';
    async: boolean;
    callback?: (...args: any) => any;
    paramCandidTypes: any[];
    returnCandidType: any;
};
