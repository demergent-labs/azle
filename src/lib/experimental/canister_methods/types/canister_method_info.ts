import '../../experimental';

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
    index: number;
};
