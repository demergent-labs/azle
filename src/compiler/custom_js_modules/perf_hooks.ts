// TODO we should PR this implementation into https://github.com/WasmEdge/WasmEdge/issues/1535
// TODO it should be pretty easy and a good way to get started in the repo

const performance = {
    now: () => new Date().getTime()
};

export { performance };
