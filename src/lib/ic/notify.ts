import { nat } from '../candid/types/primitive/nats/nat';
import { Void } from '../candid/types/primitive/void';
import { notifyRaw } from './notify_raw';
import { ArgsType } from './types/args_type';

/**
 * Sends a one-way message with payment cycles attached to it that invokes
 * method with arguments args on the principal identified by id, ignoring the
 * reply.
 *
 * Returns Void if the message was successfully enqueued, otherwise returns a
 * reject code.
 *
 * > **_Notes_**
 * >
 * > - The caller has no way of checking whether the destination processed the
 * > notification. The system can drop the notification if the destination does
 * > not have resources to process the message (for example, if it’s out of
 * > cycles or queue slots).
 * >
 * > - The callee cannot tell whether the call is one-way or not. The callee
 * > must produce replies for all incoming messages.
 * >
 * > - It is safe to upgrade a canister without stopping it first if it sends
 * > out only one-way messages.
 * >
 * > - If the payment is non-zero and the system fails to deliver the
 * > notification, the behavior is unspecified: the funds can be either
 * > reimbursed or consumed irrevocably by the IC depending on the underlying
 * > implementation of one-way calls.
 * @param method
 * @param config
 * @returns
 */
export function notify<T extends (...args: any[]) => any>(
    method: T,
    config?: {
        args?: ArgsType<T>;
        cycles?: nat;
    }
): Void {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return method(
        true,
        notifyRaw,
        config?.cycles ?? 0n,
        ...(config?.args ?? [])
    );
}
