import { GuardResult } from './results';

export const $heartbeat = (options?: { guard?: () => GuardResult }) => {};
export const $init = () => {}; // TODO: See https://github.com/demergent-labs/azle/issues/954
export const $inspectMessage = (options?: { guard?: () => GuardResult }) => {};
export const $postUpgrade = () => {}; // TODO: See https://github.com/demergent-labs/azle/issues/954
export const $preUpgrade = (options?: { guard?: () => GuardResult }) => {};
export const $query = (options?: { guard?: () => GuardResult }) => {};
export const $update = (options?: { guard?: () => GuardResult }) => {};
