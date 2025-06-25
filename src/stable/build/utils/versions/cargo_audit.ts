import { getCargoVersion } from './get_cargo_version';

export function getLocalCargoAuditVersion(): string {
    try {
        return getCargoVersion('cargo-audit');
    } catch (_error) {
        return '0.20.0'; // Return default version if cargo-audit is not installed
    }
}
