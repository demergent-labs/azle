import { ic, nat32, Update } from 'azle';

export function stable_size(): Update<nat32> {
    return ic.stable_size();
}
