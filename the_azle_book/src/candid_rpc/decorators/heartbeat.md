# @heartbeat

Called periodically (~every second). Not recommended for most use cases.

- **State**: read-write
- **Replication**: yes
- **Async**: yes
- **Instruction limit**: 40_000_000_000

Only one `@heartbeat` method is allowed per canister.

> **Note**: Use `setTimer` and `setTimerInterval` instead of `@heartbeat` for most periodic tasks.

## Basic Usage

```typescript
import { IDL, heartbeat } from 'azle';

export default class {
    heartbeatCount: number = 0;

    @heartbeat()
    periodicTask(): void {
        this.heartbeatCount += 1;
        console.log(`Heartbeat ${this.heartbeatCount}`);
    }
}
```

## Periodic Cleanup

```typescript
import { IDL, heartbeat, time } from 'azle';

export default class {
    sessions: Map<string, { userId: string; lastActive: bigint }> = new Map();
    lastCleanup: bigint = 0n;

    @heartbeat()
    cleanup(): void {
        const now = time();
        const oneHour = 60n * 60n * 1_000_000_000n; // 1 hour in nanoseconds

        // Only run cleanup every hour
        if (now - this.lastCleanup < oneHour) {
            return;
        }

        // Clean up expired sessions
        const expiredSessions: string[] = [];
        for (const [sessionId, session] of this.sessions.entries()) {
            if (now - session.lastActive > oneHour * 24n) {
                // 24 hours
                expiredSessions.push(sessionId);
            }
        }

        for (const sessionId of expiredSessions) {
            this.sessions.delete(sessionId);
        }

        console.log(`Cleaned up ${expiredSessions.length} expired sessions`);
        this.lastCleanup = now;
    }
}
```

## Async Operations

```typescript
import { IDL, heartbeat, call } from 'azle';

export default class {
    lastHealthCheck: bigint = 0n;
    isHealthy: boolean = true;

    @heartbeat()
    async healthCheck(): Promise<void> {
        const now = time();
        const fiveMinutes = 5n * 60n * 1_000_000_000n;

        // Only check every 5 minutes
        if (now - this.lastHealthCheck < fiveMinutes) {
            return;
        }

        try {
            // Check external service
            const response = await call('external-service-canister', 'ping', {
                returnIdlType: IDL.Bool
            });

            this.isHealthy = response;
            console.log(`Health check: ${this.isHealthy ? 'OK' : 'FAILED'}`);
        } catch (error) {
            this.isHealthy = false;
            console.log(`Health check failed: ${error}`);
        }

        this.lastCleanup = now;
    }
}
```

## Why Use Timers Instead

Timers are more flexible and efficient:

```typescript
import { IDL, init, setTimerInterval, clearTimer } from 'azle';

export default class {
    cleanupTimerId: bigint | null = null;

    @init()
    initialize(): void {
        // Set up periodic cleanup with timer instead of heartbeat
        this.cleanupTimerId = setTimerInterval(3600, () => {
            // Every hour
            this.performCleanup();
        });
    }

    performCleanup(): void {
        console.log('Performing scheduled cleanup...');
        // Cleanup logic here
    }

    stopCleanup(): void {
        if (this.cleanupTimerId) {
            clearTimer(this.cleanupTimerId);
            this.cleanupTimerId = null;
        }
    }
}
```

## Limitations

- Cannot guarantee exact timing
- Runs on all replicas (waste of resources)
- May not execute during high load
- Cannot pass arguments
- Limited to ~1 second intervals

## When to Use Heartbeat

Only use `@heartbeat` when you need:

- Guaranteed periodic execution across all replicas
- System-level maintenance tasks
- Monitoring that must run even when canister is idle

For most use cases, prefer `setTimer` and `setTimerInterval`.
