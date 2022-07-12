import { Query, blob, nat64, ic } from 'azle';

// import { nat64 } from '../../../..';

// type PerformanceStats = {
//     [function_name: string]: nat64[];
// };

// export let performance_stats: PerformanceStats = {};

type PerformanceStats = {
    get_bytes: nat64[];
};

let performance_stats: PerformanceStats = {
    get_bytes: []
};

export function get_bytes(bytes: blob): Query<blob> {
    performance_stats.get_bytes.push(ic.performance_counter(0));
    return bytes;
}

export function get_performance_states(): Query<PerformanceStats> {
    return performance_stats;
}