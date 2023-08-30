import './globals';

export {
    $heartbeat,
    $init,
    $inspectMessage,
    $postUpgrade,
    $preUpgrade,
    $query,
    $update
} from './annotations';
export type { CanisterMethodOptions } from './annotations';

export { ic } from './ic';
export type {
    Duration,
    NotifyResult,
    RejectionCode,
    Stable64GrowResult,
    StableGrowResult,
    StableMemoryError,
    TimerId
} from './ic';

export { Opt } from './candid_types';
export type {
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
    // nat32,
    nat64,
    nat8,
    Principal,
    Record,
    reserved,
    Service,
    text,
    Tuple,
    Variant // Vec
} from './candid_types';

export type nat32 = number;
export type Vec<T> = T[];

export type { Oneway, Query, Update, FuncSignature } from './candid_types/func';
export { match } from './candid_types/variant';
export { serviceQuery, serviceUpdate } from './candid_types/service';

export { Result } from './results';
export type { CallResult, GuardResult } from './results';

export type { StableBTreeMap } from './stable_b_tree_map';

export type Manual<T> = void;

export function registerPlugin(props: {
    globalObjectName?: string;
    rustRegisterFunctionName: string;
}) {
    if (props.globalObjectName !== undefined) {
        return (globalThis as any)[props.globalObjectName] ?? {};
    }
}
