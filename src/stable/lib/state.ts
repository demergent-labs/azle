import { log } from './globals';

export type Action =
    | DELETE_AZLE_REJECT_CALLBACK
    | DELETE_AZLE_RESOLVE_CALLBACK
    | DELETE_AZLE_TIMER_CALLBACK
    | SET_AZLE_CANISTER_CLASS_META
    | SET_AZLE_CANISTER_METHOD_NAMES
    | SET_AZLE_ICP_REPLICA_WASM_ENVIRONMENT
    | SET_AZLE_REJECT_CALLBACK
    | SET_AZLE_RESOLVE_CALLBACK
    | SET_AZLE_TIMER_CALLBACK
    | SET_CONSOLE
    | SET_CRYPTO
    | SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY
    | SET_TEXT_DECODER
    | SET_TEXT_ENCODER;

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

interface SET_AZLE_CANISTER_CLASS_META extends ActionShape {
    type: 'SET_AZLE_CANISTER_CLASS_META';
    payload: typeof globalThis._azleCanisterClassMeta;
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
        rejectCallback: NonNullable<
            typeof globalThis._azleRejectCallbacks
        >[string];
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
        resolveCallback: NonNullable<
            typeof globalThis._azleResolveCallbacks
        >[string];
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
        timerCallback: NonNullable<
            typeof globalThis._azleTimerCallbacks
        >[string];
    };
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_CONSOLE extends ActionShape {
    type: 'SET_CONSOLE';
    payload: typeof globalThis.console;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_CRYPTO extends ActionShape {
    type: 'SET_CRYPTO';
    payload: typeof globalThis.crypto;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY extends ActionShape {
    type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY';
    payload: string;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_TEXT_DECODER extends ActionShape {
    type: 'SET_TEXT_DECODER';
    payload: typeof globalThis.TextDecoder;
    location: {
        filepath: string;
        functionName: string;
    };
}

interface SET_TEXT_ENCODER extends ActionShape {
    type: 'SET_TEXT_ENCODER';
    payload: typeof globalThis.TextEncoder;
    location: {
        filepath: string;
        functionName: string;
    };
}

/**
 * Dispatches an action to the Azle JavaScript runtime.
 *
 * This function processes action objects with the provided type and payload,
 * along with location information (filepath and function name), to perform
 * important global state changes in Azle. Actions are used to manage global state
 * like inter-canister callbacks and timer callbacks.
 *
 * @param action - The action object to dispatch, containing:
 *   - type: String identifying the action type
 *   - payload: Data relevant to the action
 *   - location: Object containing filepath and functionName for debugging
 */
globalThis._azleDispatch = (action: Action): void => {
    if (
        globalThis.process !== undefined &&
        globalThis.process.env.AZLE_LOG_ACTIONS === 'true'
    ) {
        log(action);
    }

    if (
        globalThis.process !== undefined &&
        globalThis.process.env.AZLE_RECORD_ACTIONS === 'true'
    ) {
        if (globalThis._azleActions === undefined) {
            globalThis._azleActions = [];
        }

        globalThis._azleActions.push(action);
    }

    if (action.type === 'DELETE_AZLE_REJECT_CALLBACK') {
        if (globalThis._azleRejectCallbacks !== undefined) {
            delete globalThis._azleRejectCallbacks[action.payload];
        }

        return;
    }

    if (action.type === 'DELETE_AZLE_RESOLVE_CALLBACK') {
        if (globalThis._azleResolveCallbacks !== undefined) {
            delete globalThis._azleResolveCallbacks[action.payload];
        }

        return;
    }

    if (action.type === 'DELETE_AZLE_TIMER_CALLBACK') {
        if (globalThis._azleTimerCallbacks !== undefined) {
            delete globalThis._azleTimerCallbacks[action.payload.toString()];
        }
        return;
    }

    if (action.type === 'SET_AZLE_CANISTER_CLASS_META') {
        globalThis._azleCanisterClassMeta = action.payload;
        return;
    }

    if (action.type === 'SET_AZLE_CANISTER_METHOD_NAMES') {
        globalThis._azleCanisterMethodNames = action.payload;
        return;
    }

    if (action.type === 'SET_AZLE_ICP_REPLICA_WASM_ENVIRONMENT') {
        globalThis._azleIcpReplicaWasmEnvironment = action.payload;
        return;
    }

    if (action.type === 'SET_AZLE_REJECT_CALLBACK') {
        if (globalThis._azleRejectCallbacks === undefined) {
            globalThis._azleRejectCallbacks = {};
        }
        globalThis._azleRejectCallbacks[action.payload.globalRejectId] =
            action.payload.rejectCallback;
        return;
    }

    if (action.type === 'SET_AZLE_RESOLVE_CALLBACK') {
        if (globalThis._azleResolveCallbacks === undefined) {
            globalThis._azleResolveCallbacks = {};
        }
        globalThis._azleResolveCallbacks[action.payload.globalResolveId] =
            action.payload.resolveCallback;
        return;
    }

    if (action.type === 'SET_AZLE_TIMER_CALLBACK') {
        if (globalThis._azleTimerCallbacks === undefined) {
            globalThis._azleTimerCallbacks = {};
        }
        globalThis._azleTimerCallbacks[action.payload.timerId.toString()] =
            action.payload.timerCallback;
        return;
    }

    if (action.type === 'SET_CONSOLE') {
        globalThis.console = action.payload;
        return;
    }

    if (action.type === 'SET_CRYPTO') {
        globalThis.crypto = action.payload;
        return;
    }

    /**
     * Creates a getter property on globalThis that throws an error when accessed.
     * Used to prevent access to experimental features when experimental mode is disabled.
     */
    if (action.type === 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY') {
        Object.defineProperty(globalThis, action.payload, {
            get() {
                throw new Error(experimentalWarningMessage(action.payload));
            },
            configurable: true
        });

        return;
    }

    if (action.type === 'SET_TEXT_DECODER') {
        globalThis.TextDecoder = action.payload;
        return;
    }

    if (action.type === 'SET_TEXT_ENCODER') {
        globalThis.TextEncoder = action.payload;
        return;
    }
};

/**
 * Generates an error message explaining how to enable experimental mode for a given feature.
 *
 * @param name - The name of the experimental feature
 * @returns A formatted error message with dfx.json configuration instructions
 */
function experimentalWarningMessage(name: string): string {
    return `Azle: experimental mode must be enabled to use global ${name}. You can enable experimental mode in your dfx.json file like this:
{
    "canisters": {
        "canisterName": {
            "type": "azle",
            "main": "index.ts",
            "custom": {
                "experimental": true
            }
        }
    }
}
`;
}
