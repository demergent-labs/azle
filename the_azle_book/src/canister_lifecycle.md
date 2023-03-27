# Canister Lifecycle

This chapter is a work in progress.

```typescript
import { $init, $postUpgrade, $preUpgrade } from 'azle';

$init;
export function init(): void {
    console.log('runs on first canister install');
}

$preUpgrade;
export function preUpgrade(): void {
    console.log('runs before canister upgrade');
}

$postUpgrade;
export function postUpgrade(): void {
    console.log('runs after canister upgrade');
}
```
