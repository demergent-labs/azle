import { blob, Principal, Service, update } from '../../src/lib_new';

class ManagementCanister extends Service {
    @update([], blob)
    raw_rand: () => Promise<blob>;
}

/**
 * A virtual canister with canister and user management functionality
 */
export const managementCanister = new ManagementCanister(
    Principal.fromText('aaaaa-aa')
);
