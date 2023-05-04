# http_request

This section is a work in progress.

Examples:

-   [http_counter](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/http_counter)

```typescript
import {
    blob,
    Func,
    nat16,
    Opt,
    $query,
    Query,
    Record,
    Tuple,
    Variant
} from 'azle';

type HttpRequest = Record<{
    method: string;
    url: string;
    headers: Header[];
    body: blob;
}>;

type HttpResponse = Record<{
    status_code: nat16;
    headers: Header[];
    body: blob;
    streaming_strategy: Opt<StreamingStrategy>;
    upgrade: Opt<boolean>;
}>;

type Header = Tuple<[string, string]>;

type StreamingStrategy = Variant<{
    Callback: CallbackStrategy;
}>;

type CallbackStrategy = Record<{
    callback: Callback;
    token: Token;
}>;

type Callback = Func<Query<(t: Token) => StreamingCallbackHttpResponse>>;

type StreamingCallbackHttpResponse = Record<{
    body: blob;
    token: Opt<Token>;
}>;

type Token = Record<{
    arbitrary_data: string;
}>;

$query;
export function http_request(req: HttpRequest): HttpResponse {
    return {
        status_code: 200,
        headers: [],
        body: Uint8Array.from([]),
        streaming_strategy: Opt.None,
        upgrade: Opt.Some(false)
    };
}
```
