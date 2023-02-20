# Canister Lifecycle

This chapter is a work in progress.

```typescript
import { $init, $post_upgrade, $pre_upgrade } from 'azle';

$init;
export function init() {
    console.log('runs on first canister install');
}

$pre_upgrade;
export function pre_upgrade() {
    console.log('runs before canister upgrade');
}

$post_upgrade;
export function post_upgrade() {
    console.log('runs after canister upgrade');
}
```
