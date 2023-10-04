# query

This section is a work in progress.

```typescript
import { Canister, query, text } from 'azle';

export default Canister({
    simpleQuery: query([], text, () => {
        return 'This is a query method';
    })
});
```
