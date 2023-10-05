# update

This section is a work in progress.

```typescript
import { Canister, query, text, update, Void } from 'azle';

let message = '';

export default Canister({
    getMessage: query([], text, () => {
        return message;
    }),
    setMessage: update([text], Void, (newMessage) => {
        message = newMessage;
    })
});
```
