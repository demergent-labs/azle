import { getCargoVersion } from './get_cargo_version';

export function getLocalCargoDenyVersion(): string {
    try {
        return getCargoVersion('cargo-deny');
    } catch (_error) {
        return '0.15.0'; // Return default version if cargo-deny is not installed
    }
}
