"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgArgData = msgArgData;
/**
 * Returns the argument data of the current method call as bytes.
 *
 * @returns The argument bytes
 *
 * @remarks
 *
 * - **Call Context**:
 *   - \@init
 *   - \@postUpgrade
 *   - \@inspectMessage
 *   - \@update
 *   - \@query, replicated and non-replicated
 *   - \@query(..., { composite: true })
 *   - after a successful inter-canister await
 *   - after a successful inter-canister await from a composite query
 */
function msgArgData() {
    if (globalThis._azleIcExperimental !== undefined) {
        return new Uint8Array(globalThis._azleIcExperimental.msgArgData());
    }
    if (globalThis._azleIc !== undefined) {
        return globalThis._azleIc.msgArgData();
    }
    return new Uint8Array();
}
