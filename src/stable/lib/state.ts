// TODO should we completely abstract away globalThis and just use an imported state object and dispatches?

interface ActionShape {
    type: string;
    payload: any;
    location: {
        filepath: string;
        functionName: string;
    };
}

export type Action = SET_AZLE_CANISTER_METHOD_NAME;

interface SET_AZLE_CANISTER_METHOD_NAME extends ActionShape {
    type: 'SET_AZLE_CANISTER_METHOD_NAME';
    payload: typeof globalThis._azleCanisterMethodNames;
    location: {
        filepath: string;
        functionName: string;
    };
}

globalThis._azleDispatch = (action: Action): void => {
    if (globalThis._azleLogActions === true) {
        console.log('dispatch', action);
    }

    if (action.type === 'SET_AZLE_CANISTER_METHOD_NAME') {
        globalThis._azleCanisterMethodNames = action.payload;
        return;
    }

    throw new Error(`Unknown action type: ${action.type}`);
};
