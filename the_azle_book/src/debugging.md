# Debugging TL;DR

If your terminal logs ever say `did not produce a response` or `response failed classification=Status code: 502 Bad Gateway`, it most likely means that your canister has thrown an error and halted execution for that call. Use `console.log` and `try/catch` liberally to track down problems and reveal error information. If your error logs do not have useful messages, use `try/catch` with a `console.log` of the catch error argument to reveal the underlying error message.

# Debugging

-   [console.log and try/catch](#consolelog-and-trycatch)
-   [Canister did not produce a response](#canister-did-not-produce-a-response)
-   [No error message](#no-error-message)
-   [Final Compiled and Bundled JavaScript](#final-compiled-and-bundled-javascript)

Azle currently has less-than-elegant error reporting. We hope to improve this significantly in the future.

In the meantime, consider the following tips when trying to debug your application.

## console.log and try/catch

At the highest level, the most important tip is this: use `console.log` and `try/catch` liberally to track down problems and reveal error information.

## Canister did not produce a response

If you ever see an error that looks like this:

```
Replica Error: reject code CanisterError, reject message IC0506: Canister bkyz2-fmaaa-aaaaa-qaaaq-cai did not produce a response, error code Some("IC0506")
```

or this:

```
2024-04-17T15:01:39.194377Z  WARN icx_proxy_dev::proxy::agent: Replica Error
2024-04-17T15:01:39.194565Z ERROR tower_http::trace::on_failure: response failed classification=Status code: 502 Bad Gateway latency=61 ms
```

it most likely means that your canister has thrown an error and halted execution for that call. First check the replica's logs for any errors messages. If there are no useful error messages, use [console.log and try/catch](#consolelog-and-trycatch) liberally to track down the source of the error and to reveal more information about the error.

Don't be surprised if you need to `console.log` after each of your program's statements (including dependencies found in `node_modules`) to find out where the error is coming from. And don't be surprised if you need to use `try/catch` with a `console.log` of the catch error argument to reveal useful error messaging.

## No error message

You might find yourself in a situation where an error is reported without a useful message like this:

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre> &nbsp; &nbsp;at &lt;anonymous&gt; (azle_main:110643)<br> &nbsp; &nbsp;at handle (azle_main:73283)<br> &nbsp; &nbsp;at next (azle_main:73452)<br> &nbsp; &nbsp;at dispatch (azle_main:73432)<br> &nbsp; &nbsp;at handle (azle_main:73283)<br> &nbsp; &nbsp;at &lt;anonymous&gt; (azle_main:73655)<br> &nbsp; &nbsp;at process_params (azle_main:73692)<br> &nbsp; &nbsp;at next (azle_main:73660)<br> &nbsp; &nbsp;at expressInit (azle_main:73910)<br> &nbsp; &nbsp;at handle (azle_main:73283)<br> &nbsp; &nbsp;at trim_prefix (azle_main:73684)<br> &nbsp; &nbsp;at &lt;anonymous&gt; (azle_main:73657)<br> &nbsp; &nbsp;at process_params (azle_main:73692)<br> &nbsp; &nbsp;at next (azle_main:73660)<br> &nbsp; &nbsp;at query3 (azle_main:73938)<br> &nbsp; &nbsp;at handle (azle_main:73283)<br> &nbsp; &nbsp;at trim_prefix (azle_main:73684)<br> &nbsp; &nbsp;at &lt;anonymous&gt; (azle_main:73657)<br> &nbsp; &nbsp;at process_params (azle_main:73692)<br> &nbsp; &nbsp;at next (azle_main:73660)<br> &nbsp; &nbsp;at handle (azle_main:73587)<br> &nbsp; &nbsp;at handle (azle_main:76233)<br> &nbsp; &nbsp;at app2 (azle_main:78091)<br> &nbsp; &nbsp;at call (native)<br> &nbsp; &nbsp;at emitTwo (azle_main:9782)<br> &nbsp; &nbsp;at emit2 (azle_main:10023)<br> &nbsp; &nbsp;at httpHandler (azle_main:87618)<br></pre>
</body>
</html>
```

or like this:

```
2024-04-17 14:35:30.433501980 UTC: [Canister bkyz2-fmaaa-aaaaa-qaaaq-cai] "    at <anonymous> (azle_main:110643)\n    at handle (azle_main:73283)\n    at next (azle_main:73452)\n    at dispatch (azle_main:73432)\n    at handle (azle_main:73283)\n    at <anonymous> (azle_main:73655)\n    at process_params (azle_main:73692)\n    at next (azle_main:73660)\n    at expressInit (azle_main:73910)\n    at handle (azle_main:73283)\n    at trim_prefix (azle_main:73684)\n    at <anonymous> (azle_main:73657)\n    at process_params (azle_main:73692)\n    at next (azle_main:73660)\n    at query3 (azle_main:73938)\n    at handle (azle_main:73283)\n    at trim_prefix (azle_main:73684)\n    at <anonymous> (azle_main:73657)\n    at process_params (azle_main:73692)\n    at next (azle_main:73660)\n    at handle (azle_main:73587)\n    at handle (azle_main:76233)\n    at app2 (azle_main:78091)\n    at call (native)\n    at emitTwo (azle_main:9782)\n    at emit2 (azle_main:10023)\n    at httpHandler (azle_main:87618)\n"
2024-04-17T14:35:31.983590Z ERROR tower_http::trace::on_failure: response failed classification=Status code: 500 Internal Server Error latency=101 ms
2024-04-17 14:36:34.652587412 UTC: [Canister bkyz2-fmaaa-aaaaa-qaaaq-cai] "    at <anonymous> (azle_main:110643)\n    at handle (azle_main:73283)\n    at next (azle_main:73452)\n    at dispatch (azle_main:73432)\n    at handle (azle_main:73283)\n    at <anonymous> (azle_main:73655)\n    at process_params (azle_main:73692)\n    at next (azle_main:73660)\n    at expressInit (azle_main:73910)\n    at handle (azle_main:73283)\n    at trim_prefix (azle_main:73684)\n    at <anonymous> (azle_main:73657)\n    at process_params (azle_main:73692)\n    at next (azle_main:73660)\n    at query3 (azle_main:73938)\n    at handle (azle_main:73283)\n    at trim_prefix (azle_main:73684)\n    at <anonymous> (azle_main:73657)\n    at process_params (azle_main:73692)\n    at next (azle_main:73660)\n    at handle (azle_main:73587)\n    at handle (azle_main:76233)\n    at app2 (azle_main:78091)\n    at call (native)\n    at emitTwo (azle_main:9782)\n    at emit2 (azle_main:10023)\n    at httpHandler (azle_main:87618)\n"
```

In these situations you might be able to use `try/catch` with a `console.log` of the catch error argument to reveal the underlying error message.

For example, this code without a `try/catch` will log errors without the message `This is the error text`:

```typescript
import express from 'express';

const app = express();

app.get('/hello-world', (_req, res) => {
    throw new Error('This is the error text');
    res.send('Hello World!');
});

app.listen();
```

You can get the message to print in the replica terminal like this:

```typescript
import express from 'express';

const app = express();

app.get('/hello-world', (_req, res) => {
    try {
        throw new Error('This is the error text');
        res.send('Hello World!');
    } catch (error) {
        console.log(error);
    }
});

app.listen();
```

## Final Compiled and Bundled JavaScript

Azle compiles and bundles your TypeScript/JavaScript into a final JavaScript file to be included and executed inside of your canister. Inspecting this final JavaScript code may help you to debug your application.

When you see something like `(azle_main:110643)` in your error stack traces, it is a reference to the final compiled and bundled JavaScript file that is actually deployed with and executed by the canister. The right-hand side of `azle_main` e.g. `:110643` is the line number in that file.

You can find the file at `[project_name]/.azle/[canister_name]/canister/src/main.js`. If you have the `AZLE_AUTORELOAD` environment variable set to `true` then you should instead look at `[project_name]/.azle/[canister_name]/canister/src/main_reloaded.js`
