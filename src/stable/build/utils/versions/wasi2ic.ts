import { getCargoVersion } from './get_cargo_version';

export function getLocalWasi2icVersion(): string {
    return getCargoVersion('wasi2ic');
}
