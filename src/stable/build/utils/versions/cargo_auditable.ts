import { getCargoVersion } from './get_cargo_version';

export function getLocalCargoAuditableVersion(): string {
    return getCargoVersion('cargo-auditable');
}
