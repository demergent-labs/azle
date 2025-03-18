if (globalThis._azleExperimental === true) {
    throw new Error(message());
}

// TODO do we need this Azle: prefix?
function message(): string {
    return "Azle: `call` cannot be imported from 'azle' when in experimental mode. Import call from 'azle/experimental' instead";
}
