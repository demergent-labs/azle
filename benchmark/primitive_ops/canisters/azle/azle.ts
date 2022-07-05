import { ic, nat64, Update } from 'azle';

export function empty(): Update<nat64> {
    return ic.performance_counter(0);
}

export {
    boolean_init_stack,
    boolean_init_heap
} from './data_types/boolean';

export {
    nat_init_stack,
    nat_init_heap
} from './data_types/nat';