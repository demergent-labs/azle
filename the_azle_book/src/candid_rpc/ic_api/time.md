# Time

API for getting the current Internet Computer system time.

## time

Get the current ICP system time in nanoseconds since the epoch.

```typescript
import { time, IDL, query } from 'azle';

export default class {
    @query([], IDL.Nat64)
    getCurrentTime(): bigint {
        return time();
    }

    @query([], IDL.Text)
    getFormattedTime(): string {
        const nanos = time();
        const date = new Date(Number(nanos / 1_000_000n));
        return date.toISOString();
    }
}
```

## Time Tracking

```typescript
import { time, IDL, query, update } from 'azle';

export default class {
    createdAt: bigint = 0n;
    events: { timestamp: bigint; event: string }[] = [];

    @init()
    initialize(): void {
        this.createdAt = time();
    }

    @update([IDL.Text], IDL.Nat64)
    logEvent(event: string): bigint {
        const timestamp = time();
        this.events.push({ timestamp, event });
        return timestamp;
    }

    @query([], IDL.Nat64)
    getUptime(): bigint {
        return time() - this.createdAt;
    }

    @query([], IDL.Text)
    getUptimeFormatted(): string {
        const uptimeNanos = time() - this.createdAt;
        const uptimeSeconds = Number(uptimeNanos / 1_000_000_000n);

        const days = Math.floor(uptimeSeconds / 86400);
        const hours = Math.floor((uptimeSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);

        return `${days}d ${hours}h ${minutes}m`;
    }
}
```

## Time-Based Operations

```typescript
import { time, IDL, query, update } from 'azle';

export default class {
    sessions: Map<string, { createdAt: bigint; lastActive: bigint }> =
        new Map();

    @update([IDL.Text], IDL.Bool)
    createSession(sessionId: string): boolean {
        const now = time();
        this.sessions.set(sessionId, {
            createdAt: now,
            lastActive: now
        });
        return true;
    }

    @update([IDL.Text], IDL.Bool)
    refreshSession(sessionId: string): boolean {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.lastActive = time();
            return true;
        }
        return false;
    }

    @query([IDL.Text], IDL.Bool)
    isSessionValid(sessionId: string): boolean {
        const session = this.sessions.get(sessionId);
        if (!session) return false;

        const now = time();
        const oneHour = 60n * 60n * 1_000_000_000n; // 1 hour in nanoseconds

        return now - session.lastActive < oneHour;
    }

    @query([], IDL.Vec(IDL.Text))
    getExpiredSessions(): string[] {
        const now = time();
        const oneHour = 60n * 60n * 1_000_000_000n;

        return Array.from(this.sessions.entries())
            .filter(([_, session]) => now - session.lastActive >= oneHour)
            .map(([sessionId, _]) => sessionId);
    }
}
```
