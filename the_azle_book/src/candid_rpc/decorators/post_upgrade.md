# @postUpgrade

Called after canister upgrade. Used to restore state.

- **State**: read-write
- **Replication**: yes
- **Async**: no
- **Instruction limit**: 300_000_000_000 (shared with preUpgrade)

Only one `@postUpgrade` method is allowed per canister.

## Basic Usage

```typescript
import { IDL, postUpgrade } from 'azle';

export default class {
    version: string = '1.0.0';

    @postUpgrade([IDL.Text])
    upgrade(newVersion: string): void {
        this.version = newVersion;
        console.log(`Upgraded to version ${newVersion}`);
    }
}
```

## State Migration

```typescript
import { IDL, postUpgrade } from 'azle';

type UserV1 = {
    name: string;
    age: number;
};

type UserV2 = {
    name: string;
    age: number;
    email: string; // New field
    active: boolean; // New field
};

export default class {
    users: Map<string, UserV2> = new Map();
    version: string = '2.0.0';

    @postUpgrade([IDL.Text])
    migrateToV2(previousVersion: string): void {
        console.log(`Migrating from ${previousVersion} to ${this.version}`);

        // Migrate existing users to new format
        for (const [id, user] of this.users.entries()) {
            const userV1 = user as any;
            if (!userV1.email) {
                const migratedUser: UserV2 = {
                    ...userV1,
                    email: `${userV1.name.toLowerCase()}@example.com`,
                    active: true
                };
                this.users.set(id, migratedUser);
            }
        }

        console.log(`Migration complete. ${this.users.size} users migrated.`);
    }
}
```

## No Arguments

```typescript
import { IDL, postUpgrade, time } from 'azle';

export default class {
    lastUpgrade: bigint = 0n;
    upgradeCount: number = 0;

    @postUpgrade()
    handleUpgrade(): void {
        this.lastUpgrade = time();
        this.upgradeCount += 1;

        console.log(
            `Upgrade #${this.upgradeCount} completed at ${this.lastUpgrade}`
        );
    }
}
```

## Options

- `manual`: Manual argument handling

```typescript
import { IDL, postUpgrade, msgArgData, candidDecode } from 'azle';

export default class {
    @postUpgrade([], { manual: true })
    manualUpgrade(): void {
        const args = msgArgData();
        const decodedArgs = candidDecode([IDL.Text, IDL.Nat], args);

        console.log('Manual upgrade with args:', decodedArgs);
    }
}
```
