export * from '../ic';
export * from '../stable_structures/stable_b_tree_map';
export * from '../stable_structures/stable_json';
export { init } from './init';
export { postUpgrade } from './post_upgrade';
export { query } from './query';
export { update } from './update';
export * from '@dfinity/candid';
export * from '@dfinity/principal';

// TODO remove for 1.0, remove all of these functional syntax APIs from stable
import { Opt } from '../';
export function convertOpt<T>(opt: Opt<T>): [T] | [] {
    if (opt.Some !== undefined) {
        return [opt.Some];
    } else {
        return [];
    }
}
