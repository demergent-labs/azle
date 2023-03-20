# msg cycles accept

This section is a work in progress.

Examples:

-   [cycles](https://github.com/demergent-labs/azle/tree/main/examples/cycles)

```typescript
// Moves all transferred cycles to the canister
$update;
export function receiveCycles(): nat64 {
    return ic.msgCyclesAccept(ic.msgCyclesAvailable() / 2n);
}
```
