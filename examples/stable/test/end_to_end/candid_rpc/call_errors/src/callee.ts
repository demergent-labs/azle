import { query, reject, update } from 'azle';

/**
 * Callee canister that contains methods that will reject or succeed
 * to test different inter-canister call error scenarios
 */
export default class {
    /**
     * A method that will explicitly reject with a custom message
     */
    @update
    explicitReject(): void {
        reject('This call was explicitly rejected by the callee');
    }

    /**
     * A normal method that will succeed
     */
    @query
    successfulMethod(): string {
        return 'Success!';
    }
}
