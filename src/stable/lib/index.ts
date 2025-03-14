import './globals';
export { heartbeat } from './canister_methods/heartbeat';
export { init } from './canister_methods/init';
export { inspectMessage } from './canister_methods/inspect_message';
export { onLowWasmMemory } from './canister_methods/on_low_wasm_memory';
export { postUpgrade } from './canister_methods/post_upgrade';
export { preUpgrade } from './canister_methods/pre_upgrade';
export { query } from './canister_methods/query';
export { update } from './canister_methods/update';
export * from './did_file';
export * from './ic_apis';
export * from './json';
export * from './stable_structures/stable_b_tree_map';
export * from './stable_structures/stable_json';
export * from '@dfinity/candid';
export * from '@dfinity/principal';

export const ic0 = globalThis._azleIc0;
