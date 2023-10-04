# http_request

This section is a work in progress.

Examples:

-   [http_counter](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/http_counter)

```typescript
import {
    blob,
    bool,
    Canister,
    Func,
    nat16,
    None,
    Opt,
    Record,
    text,
    Tuple,
    update,
    Variant,
    Vec
} from 'azle';

const Token = Record({
    // add whatever fields you'd like
    arbitrary_data: text
});

const StreamingCallbackHttpResponse = Record({
    body: blob,
    token: Opt(Token)
});

export const Callback = Func([text], StreamingCallbackHttpResponse, 'query');

const CallbackStrategy = Record({
    callback: Callback,
    token: Token
});

const StreamingStrategy = Variant({
    Callback: CallbackStrategy
});

type HeaderField = [text, text];
const HeaderField = Tuple(text, text);

const HttpResponse = Record({
    status_code: nat16,
    headers: Vec(HeaderField),
    body: blob,
    streaming_strategy: Opt(StreamingStrategy),
    upgrade: Opt(bool)
});

const HttpRequest = Record({
    method: text,
    url: text,
    headers: Vec(HeaderField),
    body: blob,
    certificate_version: Opt(nat16)
});

export default Canister({
    http_request_update: update([HttpRequest], HttpResponse, (req) => {
        return {
            status_code: 200,
            headers: [],
            body: Buffer.from('hello'),
            streaming_strategy: None,
            upgrade: None
        };
    })
});
```
