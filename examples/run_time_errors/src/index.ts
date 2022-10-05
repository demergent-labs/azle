import {
    Query,
    Heartbeat,
    Init,
    PreUpgrade,
    PostUpgrade,
    ic,
    InspectMessage,
    Update
} from 'azle';

// throw 'Uncomment this to test that errors are handled during the eval process.';

class CustomClass {
    public toString = (): string => {
        return 'CustomClass toString';
    };
}

export function throw_bigint(): Query<void> {
    throw 3n;
}

export function throw_boolean(): Query<void> {
    throw false;
}

export function throw_class(): Query<void> {
    throw new CustomClass();
}

export function throw_custom_error(): Query<void> {
    throw Error('This is a custom error');
}

export function throw_int(): Query<void> {
    throw 3;
}

export function throw_null(): Query<void> {
    throw null;
}

export function throw_null_reference(): Query<void> {
    const null_object: any = null;
    null_object.first_field;
}

export function throw_object(): Query<void> {
    throw { thing: 1 };
}

export function throw_rational(): Query<void> {
    throw 3.14;
}

export function throw_string(): Query<void> {
    throw 'Hello World';
}

export function throw_symbol(): Query<void> {
    throw Symbol();
}

export function throw_undefined(): Query<void> {
    throw undefined;
}

// All of the functionality can be tested with only the functions above.
// The functions below demonstrate that heartbeat, init, etc are also handled
// but they are all handled with the same code.

let inititalized = false;
let heartbeating = false;

export function get_initialized(): Query<boolean> {
    return inititalized;
}

export function heartbeat(): Heartbeat {
    heartbeating = true;
    throw 'We are throwing in the heartbeat';
}

export function inspect_message(): InspectMessage {
    console.log('inspect_message called');

    if (
        ic.method_name() !== 'inaccessible' ||
        ic.method_name() !== 'also_inaccessible'
    ) {
        ic.accept_message();
        return;
    }

    if (ic.method_name() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.method_name()}" not allowed`;
}

export function accessible(): Update<boolean> {
    return true;
}

export function inaccessible(): Update<boolean> {
    return false;
}

export function also_inaccessible(): Update<boolean> {
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
