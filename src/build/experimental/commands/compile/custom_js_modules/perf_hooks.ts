// TODO this is just a placeholder module so that bundling won't break
// TODO eventually we would want a real implementation of this in Azle or wasmedge-quickjs or Waden
// TODO we should PR this implementation into https://github.com/WasmEdge/WasmEdge/issues/1535
// TODO it should be pretty easy and a good way to get started in the repo

const performance = {
    now: (): number => new Date().getTime()
};

export { performance };
