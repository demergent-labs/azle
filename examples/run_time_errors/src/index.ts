import { $heartbeat, ic, $inspectMessage, $query, $update } from 'azle';

// throw 'Uncomment this to test that errors are handled during the eval process.';

class CustomClass {
    public toString = (): string => {
        return 'CustomClass toString';
    };
}

$query;
export function throw_bigint(): void {
    throw 3n;
}

$query;
export function throw_boolean(): void {
    throw false;
}

$query;
export function throw_class(): void {
    throw new CustomClass();
}

$query;
export function throw_custom_error(): void {
    throw Error('This is a custom error');
}

$query;
export function throw_int(): void {
    throw 3;
}

$query;
export function throw_null(): void {
    throw null;
}

$query;
export function throw_null_reference(): void {
    const null_object: any = null;
    null_object.first_field;
}

$query;
export function throw_object(): void {
    throw { thing: 1 };
}

$query;
export function throw_rational(): void {
    throw 3.14;
}

$query;
export function throw_string(): void {
    throw 'Hello World';
}

$query;
export function throw_symbol(): void {
    throw Symbol();
}

$query;
export function throw_undefined(): void {
    throw undefined;
}

// All of the functionality can be tested with only the functions above.
// The functions below demonstrate that heartbeat, init, etc are also handled
// but they are all handled with the same code.

let inititalized = false;
let heartbeating = false;

$query;
export function get_initialized(): boolean {
    return inititalized;
}

$heartbeat;
export function heartbeat() {
    heartbeating = true;
    throw 'We are throwing in the heartbeat';
}

$inspectMessage;
export function inspect_message() {
    console.log('inspect_message called');

    if (
        ic.methodName() !== 'inaccessible' ||
        ic.methodName() !== 'also_inaccessible'
    ) {
        ic.acceptMessage();
        return;
    }

    if (ic.methodName() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.methodName()}" not allowed`;
}

$update;
export function accessible(): boolean {
    return true;
}

$update;
export function inaccessible(): boolean {
    return false;
}

$update;
export function also_inaccessible(): boolean {
    return false;
}

// If any of these are uncommented then none of the rest of the canister will
// get installed properly. If you want to test them out uncomment them and
// deploy again. When you are done testing comment them out again and make sure
// you do a clean start.

// export function init(): Init {
//     inititalized = true;
//     throw 'We are throwing in the init';
// }

// export function pre_upgrade(): PreUpgrade {
//     console.log('pre_upgrade');
//     throw 'We are throwing in the pre-upgrade';
// }

// export function post_upgrade(): PostUpgrade {
//     console.log('post_upgrade');
//     throw 'We are throwing in the post-upgrade';
// }
