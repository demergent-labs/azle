# Canister Lifecycle

This chapter is a work in progress.

```typescript
import { Canister, init, postUpgrade, preUpgrade } from 'azle';

export default Canister({
    init: init([], () => {
        console.log('runs on first canister install');
    }),
    preUpgrade: preUpgrade(() => {
        console.log('runs before canister upgrade');
    }),
    postUpgrade: postUpgrade([], () => {
        console.log('runs after canister upgrade');
    })
});
```
