import { getCargoVersion } from './get_cargo_version';

export function getLocalCargoDenyVersion(): string {
    return getCargoVersion('cargo-deny');
}
