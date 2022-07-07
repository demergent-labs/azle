import { ic, nat32, nat64, Query } from 'azle';

export function stable_size(): Query<nat32> {
    return ic.stable_size();
}

export function stable64_size(): Query<nat64> {
    return ic.stable64_size();
}
