import { $heartbeat, ic, $inspectMessage, $query, $update, Opt } from 'azle';

// throw 'Uncomment this to test that errors are handled during the eval process.';

class CustomClass {
    public toString = (): string => {
        return 'CustomClass toString';
    };
}

$query;
export function throwBigint(): void {
    throw 3n;
}

$query;
export function throwBoolean(): void {
    throw false;
}

$query;
export function throwClass(): void {
    throw new CustomClass();
}

$query;
export function throwCustomError(): void {
    throw Error('This is a custom error');
}

$query;
export function throwInt(): void {
    throw 3;
}

$query;
export function throwNull(): void {
    throw null;
}

$query;
export function throwNullReference(): void {
    const nullObject: any = null;
    nullObject.firstField;
}

$query;
export function throwObject(): void {
    throw { thing: 1 };
}

$query;
export function throwRational(): void {
    throw 3.14;
}

$query;
export function throwString(): void {
    throw 'Hello World';
}

$query;
export function throwSymbol(): void {
    throw Symbol();
}

$query;
export function throwUndefined(): void {
    throw undefined;
}

// All of the functionality can be tested with only the functions above.
// The functions below demonstrate that heartbeat, init, etc are also handled
// but they are all handled with the same code.

let inititalized = false;
let heartbeating = false;

$query;
export function getInitialized(): boolean {
    return inititalized;
}

$heartbeat;
export function heartbeat(): void {
    heartbeating = true;
    throw 'We are throwing in the heartbeat';
}

$inspectMessage;
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

$update;
export function accessible(): boolean {
    return true;
}

$update;
export function inaccessible(): boolean {
    return false;
}

$update;
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

//#region invalid Opt return values
$query;
export function returnNonObject(): Opt<string> {
    // @ts-expect-error: We want to test how this errors out
    return true;
}

$query;
export function returnBothSomeAndNone(): Opt<string> {
    // @ts-expect-error
    return { Some: 'string', None: null };
}

$query;
export function returnObjectWithNeitherSomeNorNone(): Opt<string> {
    // @ts-expect-error
    return { Non: null };
}

$query;
export function returnNonNullNone(): Opt<string> {
    // @ts-expect-error
    return { None: 'not null value' };
}

$query;
export function returnInvalidSomeValue(): Opt<string> {
    // @ts-expect-error
    return { Some: null };
}
//#endregion
