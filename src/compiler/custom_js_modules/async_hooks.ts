// TODO this is just a placeholder module so that bundling won't break
// TODO eventually we would want a real implementation of this in Azle or wasmedge-quickjs or Waden
// TODO it seems async_hooks is impossible or very difficult to polyfill in the browser
// TODO I am not sure what it would take to do it in Wasm/QuickJS
// TODO It might be a bit tricky
// TODO We might be able to PR into NestJS and get rid of their dependency on this (turns out they check if asyncHooks.AsyncResource is defined)
// TODO as Node.js does not recommend its use

export {};
