"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("./globals");
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
globalThis._azleDispatch = function (action) {
    if (globalThis.process !== undefined &&
        globalThis.process.env.AZLE_LOG_ACTIONS === 'true') {
        (0, globals_1.log)(action);
    }
    if (globalThis.process !== undefined &&
        globalThis.process.env.AZLE_RECORD_ACTIONS === 'true' &&
        globalThis._azleActions !== undefined) {
        globalThis._azleActions.push(action);
    }
    if (action.type === 'DELETE_AZLE_REJECT_CALLBACK') {
        if (globalThis._azleRejectCallbacks === undefined) {
            throw new Error('globalThis._azleRejectCallbacks is undefined');
        }
        delete globalThis._azleRejectCallbacks[action.payload];
        return;
    }
    if (action.type === 'DELETE_AZLE_RESOLVE_CALLBACK') {
        if (globalThis._azleResolveCallbacks === undefined) {
            throw new Error('globalThis._azleResolveCallbacks is undefined');
        }
        delete globalThis._azleResolveCallbacks[action.payload];
        return;
    }
    if (action.type === 'DELETE_AZLE_TIMER_CALLBACK') {
        if (globalThis._azleTimerCallbacks === undefined) {
            throw new Error('globalThis._azleTimerCallbacks is undefined');
        }
        delete globalThis._azleTimerCallbacks[action.payload.toString()];
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
            get: function () {
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
function experimentalWarningMessage(name) {
    return "Azle: experimental mode must be enabled to use global ".concat(name, ". You can enable experimental mode in your dfx.json file like this:\n{\n    \"canisters\": {\n        \"canisterName\": {\n            \"type\": \"azle\",\n            \"main\": \"index.ts\",\n            \"custom\": {\n                \"experimental\": true\n            }\n        }\n    }\n}\n");
}
