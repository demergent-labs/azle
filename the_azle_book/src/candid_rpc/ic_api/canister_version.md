# canisterVersion

Get the current canister version number.

```typescript
import { canisterVersion, IDL, query } from 'azle';

export default class {
    @query([], IDL.Nat64)
    getVersion(): bigint {
        return canisterVersion();
    }

    @query([], IDL.Text)
    getVersionInfo(): string {
        const version = canisterVersion();
        return `Canister version: ${version}`;
    }
}
```

The `canisterVersion` function returns the current version number of the canister. The version increments each time the canister is upgraded.

**Returns:** Current canister version (`bigint`)

**Use Cases:**

- Track canister upgrades
- Version-dependent logic
- Debugging and monitoring
- Migration management

**Important Notes:**

- Starts at 0 for newly installed canisters
- Increments by 1 with each upgrade
- Persists across canister upgrades
