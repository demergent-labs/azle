export type Action =
    | DELETE_AZLE_REJECT_CALLBACK
    | DELETE_AZLE_RESOLVE_CALLBACK
    | DELETE_AZLE_TIMER_CALLBACK
    | SET_AZLE_CANISTER_METHOD_NAMES
    | SET_AZLE_EXPORTED_CANISTER_CLASS_INSTANCE
    | SET_AZLE_ICP_REPLICA_WASM_ENVIRONMENT
    | SET_AZLE_REJECT_CALLBACK
    | SET_AZLE_RESOLVE_CALLBACK
    | SET_AZLE_TIMER_CALLBACK;

interface ActionShape {
    type: string;
    payload: any;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface DELETE_AZLE_REJECT_CALLBACK extends ActionShape {
    type: 'DELETE_AZLE_REJECT_CALLBACK';
    payload: string;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface DELETE_AZLE_RESOLVE_CALLBACK extends ActionShape {
    type: 'DELETE_AZLE_RESOLVE_CALLBACK';
    payload: string;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface DELETE_AZLE_TIMER_CALLBACK extends ActionShape {
    type: 'DELETE_AZLE_TIMER_CALLBACK';
    payload: bigint;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_AZLE_CANISTER_METHOD_NAMES extends ActionShape {
    type: 'SET_AZLE_CANISTER_METHOD_NAMES';
    payload: typeof globalThis._azleCanisterMethodNames;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_AZLE_EXPORTED_CANISTER_CLASS_INSTANCE extends ActionShape {
    type: 'SET_AZLE_EXPORTED_CANISTER_CLASS_INSTANCE';
    payload: typeof globalThis._azleExportedCanisterClassInstance;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_AZLE_ICP_REPLICA_WASM_ENVIRONMENT extends ActionShape {
    type: 'SET_AZLE_ICP_REPLICA_WASM_ENVIRONMENT';
    payload: typeof globalThis._azleIcpReplicaWasmEnvironment;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_AZLE_REJECT_CALLBACK extends ActionShape {
    type: 'SET_AZLE_REJECT_CALLBACK';
    payload: {
        globalRejectId: string;
        rejectCallback: (typeof globalThis._azleRejectCallbacks)[string];
    };
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_AZLE_RESOLVE_CALLBACK extends ActionShape {
    type: 'SET_AZLE_RESOLVE_CALLBACK';
    payload: {
        globalResolveId: string;
        resolveCallback: (typeof globalThis._azleResolveCallbacks)[string];
    };
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_AZLE_TIMER_CALLBACK extends ActionShape {
    type: 'SET_AZLE_TIMER_CALLBACK';
    payload: {
        timerId: bigint;
        timerCallback: (typeof globalThis._azleTimerCallbacks)[string];
    };
    location: {
        filepath: string;
        functionName: string;
    };
}

globalThis._azleDispatch = (action: Action): void => {
    if (globalThis._azleLogActions === true) {
        console.log('dispatch', action);
    }

    if (action.type === 'SET_AZLE_CANISTER_METHOD_NAMES') {
        globalThis._azleCanisterMethodNames = action.payload;
        return;
    }

    if (action.type === 'SET_AZLE_EXPORTED_CANISTER_CLASS_INSTANCE') {
        globalThis._azleExportedCanisterClassInstance = action.payload;
        return;
    }

    if (action.type === 'SET_AZLE_ICP_REPLICA_WASM_ENVIRONMENT') {
        globalThis._azleIcpReplicaWasmEnvironment = action.payload;
        return;
    }

    if (action.type === 'SET_AZLE_REJECT_CALLBACK') {
        globalThis._azleRejectCallbacks[action.payload.globalRejectId] =
            action.payload.rejectCallback;
        return;
    }

    if (action.type === 'SET_AZLE_RESOLVE_CALLBACK') {
        globalThis._azleResolveCallbacks[action.payload.globalResolveId] =
            action.payload.resolveCallback;
        return;
    }

    if (action.type === 'DELETE_AZLE_RESOLVE_CALLBACK') {
        delete globalThis._azleResolveCallbacks[action.payload];
        return;
    }

    if (action.type === 'DELETE_AZLE_REJECT_CALLBACK') {
        delete globalThis._azleRejectCallbacks[action.payload];
        return;
    }

    if (action.type === 'SET_AZLE_TIMER_CALLBACK') {
        globalThis._azleTimerCallbacks[action.payload.timerId.toString()] =
            action.payload.timerCallback;
        return;
    }

    if (action.type === 'DELETE_AZLE_TIMER_CALLBACK') {
        delete globalThis._azleTimerCallbacks[action.payload.toString()];
        return;
    }
};
