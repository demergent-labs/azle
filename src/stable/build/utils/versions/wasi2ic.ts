import { getCargoVersion } from './cargo_audit';

export function getLocalWasi2icVersion(): string {
    return getCargoVersion('wasi2ic');
}
