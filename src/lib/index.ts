export {
    $heartbeat,
    $init,
    $inspectMessage,
    $postUpgrade,
    $preUpgrade,
    $query,
    $update
} from './annotations';
export {
    Duration,
    ic,
    NotifyResult,
    RejectionCode,
    Stable64GrowResult,
    StableGrowResult,
    StableMemoryError,
    TimerId
} from './ic';
export {
    Alias,
    blob,
    empty,
    float32,
    float64,
    Func,
    int,
    int16,
    int32,
    int64,
    int8,
    nat,
    nat16,
    nat32,
    nat64,
    nat8,
    Opt,
    Principal,
    Record,
    reserved,
    Service,
    text,
    Tuple,
    Variant,
    Vec
} from './candid_types';
export { Oneway, Query, Update } from './candid_types/func';
export { match } from './candid_types/variant';
export { serviceQuery, serviceUpdate } from './candid_types/service';
export { CallResult, FinalCallResult, GuardResult, Result } from './results';
export { StableBTreeMap } from './stable_b_tree_map';

export type Manual<T> = void;

export function registerPlugin(props: {
    globalObjectName?: string;
    rustRegisterFunctionName: string;
}) {
    if (props.globalObjectName !== undefined) {
        return (globalThis as any)[props.globalObjectName] ?? {};
    }
}
