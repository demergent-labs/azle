/**
 * Returns the amount of cycles that were transferred by the caller of the
 * current call, and is still available in this message
 * @returns the amount of cycles
 */
export function msgCyclesAvailable128(): bigint {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const msgCyclesAvailable128AmountString =
        globalThis._azleIc.msgCyclesAvailable128();

    return BigInt(msgCyclesAvailable128AmountString);
}
