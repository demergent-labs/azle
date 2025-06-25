import { getCargoVersion } from './get_cargo_version';

export function getLocalCargoAuditVersion(): string {
    return getCargoVersion('cargo-audit');
}
