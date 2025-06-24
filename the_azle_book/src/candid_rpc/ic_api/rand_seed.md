# randSeed

Seed the pseudorandom number generator with cryptographically secure randomness.

```typescript
import { randSeed, IDL, update } from 'azle';

export default class {
    @update([], IDL.Vec(IDL.Nat8))
    generateRandomBytes(): Uint8Array {
        // Seed with secure randomness from the IC
        randSeed();

        // Generate random bytes using standard Math.random()
        const bytes = new Uint8Array(32);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }

        return bytes;
    }

    @update([], IDL.Nat)
    rollDice(): number {
        randSeed();
        return Math.floor(Math.random() * 6) + 1;
    }

    @update([IDL.Vec(IDL.Text)], IDL.Text)
    selectRandom(items: string[]): string {
        if (items.length === 0) {
            throw new Error('Cannot select from empty array');
        }

        randSeed();
        const index = Math.floor(Math.random() * items.length);
        return items[index];
    }
}
```

The `randSeed` function seeds JavaScript's `Math.random()` with cryptographically secure randomness from the Internet Computer. This ensures that random number generation is truly unpredictable.

**Returns:** `void`

**Use Cases:**

- Secure random number generation
- Lottery and gaming systems
- Random selection algorithms
- Cryptographic nonce generation

**Important Notes:**

- Provides cryptographically secure randomness
- Must be called before using `Math.random()` for security
- Randomness is consensus-based across all replicas
- Call once per method that needs randomness
