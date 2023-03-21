# Canister Lifecycle

This chapter is a work in progress.

```typescript
import { $init, $postUpgrade, $preUpgrade } from 'azle';

$init;
export function init() {
    console.log('runs on first canister install');
}

$preUpgrade;
export function preUpgrade() {
    console.log('runs before canister upgrade');
}

$postUpgrade;
export function postUpgrade() {
    console.log('runs after canister upgrade');
}
```
