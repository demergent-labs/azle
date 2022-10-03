import {
    int32,
    Query,
    Heartbeat,
    Init,
    PreUpgrade,
    PostUpgrade,
    ic,
    InspectMessage,
    Update
} from 'azle';

class CustomClass {
    public toString = (): string => {
        return 'This is the toString of the custom class';
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
    const null_object = null;
    trick_type_checker(null_object);
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

function trick_type_checker(object: any) {
    return object.first_field;
}

let inititalized = false;
let heartbeating = false;

// export function heartbeat(): Heartbeat {
//     heartbeating = true;
//     throw 'We are throwing in the heartbeat';
// }

// export function init(): Init {
//     inititalized = true;
//     throw 'We are throwing in the init';
// }

export function getInitialized(): Query<boolean> {
    return inititalized;
}

// export function preUpgrade(): PreUpgrade {
//     console.log('preUpgrade');
//     throw 'We are throwing in the pre-upgrade';
// }

// export function postUpgrade(): PostUpgrade {
//     console.log('postUpgrade');
//     throw 'We are throwing in the post-upgrade';
// }

export function inspectMessage(): InspectMessage {
    console.log('inspect_message called');

    if (
        ic.method_name() !== 'inaccessible' ||
        ic.method_name() !== 'alsoInaccessible'
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

export function alsoInaccessible(): Update<boolean> {
    return false;
}
