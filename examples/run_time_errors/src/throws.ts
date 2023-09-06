import { ic } from 'azle';
import RunTimeErrorService from './index';

// throw 'Uncomment this to test that errors are handled during the eval process.';

class CustomClass {
    public toString = (): string => {
        return 'CustomClass toString';
    };
}

export function throwBigint(): void {
    throw 3n;
}

export function throwBoolean(): void {
    throw false;
}

export function throwClass(): void {
    throw new CustomClass();
}

export function throwCustomError(): void {
    throw Error('This is a custom error');
}

export function throwInt(): void {
    throw 3;
}

export function throwNull(): void {
    throw null;
}

export function throwNullReference(): void {
    const nullObject: any = null;
    nullObject.firstField;
}

export function throwObject(): void {
    throw { thing: 1 };
}

export function throwRational(): void {
    throw 3.14;
}

export function throwString(): void {
    throw 'Hello World';
}

export function throwSymbol(): void {
    throw Symbol();
}

export function throwUndefined(): void {
    throw undefined;
}

// All of the functionality can be tested with only the functions above.
// The functions below demonstrate that heartbeat, init, etc are also handled
// but they are all handled with the same code.

export function getInitialized(canister: RunTimeErrorService): boolean {
    return canister.inititalized;
}

export function heartbeat(canister: RunTimeErrorService): void {
    canister.heartbeating = true;
    throw 'We are throwing in the heartbeat';
}

export function inspectMessage(): void {
    console.log('inspectMessage called');

    if (
        ic.methodName() !== 'inaccessible' ||
        ic.methodName() !== 'alsoInaccessible'
    ) {
        ic.acceptMessage();
        return;
    }

    if (ic.methodName() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.methodName()}" not allowed`;
}

export function accessible(): boolean {
    return true;
}

export function inaccessible(): boolean {
    return false;
}

export function alsoInaccessible(): boolean {
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

// export function preUpgrade(): PreUpgrade {
//     console.log('preUpgrade');
//     throw 'We are throwing in the pre-upgrade';
// }

// export function postUpgrade(): PostUpgrade {
//     console.log('postUpgrade');
//     throw 'We are throwing in the post-upgrade';
// }
