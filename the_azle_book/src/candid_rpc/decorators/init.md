# @init

Canister initialization method. Called once during deployment.

- **State**: read-write
- **Replication**: yes
- **Async**: no
- **Instruction limit**: 300_000_000_000

Only one `@init` method is allowed per canister.

## Basic Usage

```typescript
import { IDL, init } from 'azle';

export default class {
    owner: string = '';
    initialized: boolean = false;

    @init([IDL.Text])
    initialize(ownerName: string): void {
        this.owner = ownerName;
        this.initialized = true;
        console.log(`Canister initialized with owner: ${ownerName}`);
    }
}
```

## Complex Initialization

```typescript
import { IDL, init, msgCaller } from 'azle';

type Config = {
    name: string;
    maxUsers: number;
    features: string[];
};

const ConfigRecord = IDL.Record({
    name: IDL.Text,
    maxUsers: IDL.Nat32,
    features: IDL.Vec(IDL.Text)
});

export default class {
    config: Config = { name: '', maxUsers: 0, features: [] };
    owner: Principal | null = null;
    users: Map<string, string> = new Map();

    @init([ConfigRecord])
    initialize(config: Config): void {
        this.config = config;
        this.owner = msgCaller();

        console.log(`Initialized canister "${config.name}"`);
        console.log(`Max users: ${config.maxUsers}`);
        console.log(`Features: ${config.features.join(', ')}`);
    }
}
```

## No Arguments

```typescript
import { IDL, init } from 'azle';

export default class {
    startTime: bigint = 0n;

    @init()
    initialize(): void {
        this.startTime = time();
        console.log('Canister initialized at:', this.startTime);
    }
}
```

## Options

- `manual`: Manual argument handling

```typescript
import { IDL, init, msgArgData, candidDecode } from 'azle';

export default class {
    @init([], { manual: true })
    initialize(): void {
        const args = msgArgData();
        const decodedArgs = candidDecode([IDL.Text], args);

        console.log('Manual init with args:', decodedArgs);
    }
}
```
