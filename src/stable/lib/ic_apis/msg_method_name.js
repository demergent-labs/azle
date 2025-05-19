"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgMethodName = msgMethodName;
/**
 * Returns the name of the method being called during message inspection.
 *
 * @returns The name of the method
 *
 * @remarks
 *
 * - **Call Context**:
 *   - \@inspectMessage
 */
function msgMethodName() {
    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.msgMethodName();
    }
    if (globalThis._azleIc !== undefined) {
        return globalThis._azleIc.msgMethodName();
    }
    return '';
}
