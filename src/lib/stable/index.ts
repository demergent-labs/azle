import './globals';
export { heartbeat } from './canister_methods/heartbeat';
export { init } from './canister_methods/init';
export { inspectMessage } from './canister_methods/inspect_message';
export { postUpgrade } from './canister_methods/post_upgrade';
export { preUpgrade } from './canister_methods/pre_upgrade';
export { query } from './canister_methods/query';
export { update } from './canister_methods/update';
export * from './ic_apis';
export * from './stable_structures/stable_b_tree_map';
export * from './stable_structures/stable_json';
export * from '@dfinity/candid';
export * from '@dfinity/principal';

// TODO remove for 1.0, remove all of these functional syntax APIs from stable
import { Opt } from '../experimental';
export function convertOpt<T>(opt: Opt<T>): [T] | [] {
    if (opt.Some !== undefined) {
        return [opt.Some];
    } else {
        return [];
    }
}
