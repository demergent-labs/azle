import { IDL, inspectMessage, jsonStringify, update } from 'azle';

export default class {
    @inspectMessage
    inspectMessage(methodName: string, ...args: any): boolean {
        console.info(`inspectMessage called with methodName:`, methodName);
        console.info(`inspectMessage called with args:`, jsonStringify(args));

        if (methodName === 'accessible' && args[0] !== 'testing accessible') {
            throw new Error(`accessible args are incorrect`);
        }

        if (methodName === 'inaccessible' && args[0] !== 12_345n) {
            throw new Error(`inaccessible args are incorrect`);
        }

        if (
            methodName === 'alsoInaccessible' &&
            args[0].prop1 !== 'testing alsoInaccessible'
        ) {
            throw new Error(`alsoInaccessible args are incorrect`);
        }

        if (
            methodName === 'accessible' ||
            methodName === '_azle_get_benchmarks' ||
            methodName === '_azle_reject_callbacks_len' ||
            methodName === '_azle_resolve_callbacks_len' ||
            methodName === '_azle_timer_callbacks_len' ||
            methodName === '_azle_actions_len' ||
            methodName === '_azle_inter_canister_call_futures_len' ||
            methodName === '_azle_is_job_queue_empty' ||
            methodName === '_azle_heap_allocation'
        ) {
            return true;
        }

        if (methodName === 'inaccessible') {
            return false;
        }

        throw new Error(`Method "${methodName}" not allowed`);
    }

    @update([IDL.Text], IDL.Bool)
    accessible(message: string): boolean {
        console.info(`accessible called with message: ${message}`);
        return true;
    }

    @update([IDL.Nat64], IDL.Bool)
    inaccessible(number: bigint): boolean {
        console.info(`inaccessible called with number: ${number}`);
        return false;
    }

    @update([IDL.Record({ prop1: IDL.Text })], IDL.Bool)
    alsoInaccessible(record: { prop1: string }): boolean {
        console.info(`alsoInaccessible called with record: ${record}`);
        return false;
    }
}
