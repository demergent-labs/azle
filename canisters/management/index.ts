import { blob, Principal, Service, update } from '../../src/lib_functional';

export const managementCanister = Service({
    raw_rand: update([], blob)
})(Principal.fromText('aaaaa-aa'));
