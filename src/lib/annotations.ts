import { GuardResult } from './results';

export type CanisterMethodOptions = { guard?: () => GuardResult };

export const $heartbeat = (options?: CanisterMethodOptions) => {};
export const $init = () => {}; // TODO: See https://github.com/demergent-labs/azle/issues/954
export const $inspectMessage = (options?: CanisterMethodOptions) => {};
export const $postUpgrade = () => {}; // TODO: See https://github.com/demergent-labs/azle/issues/954
export const $preUpgrade = (options?: CanisterMethodOptions) => {};
export const $query = (options?: CanisterMethodOptions) => {};
export const $update = (options?: CanisterMethodOptions) => {};
