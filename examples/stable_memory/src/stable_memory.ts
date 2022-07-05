import { ic, nat32, Query } from 'azle';

export function stable_size(): Query<nat32> {
    return ic.stable_size();
}
