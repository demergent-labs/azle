import {
    $heartbeat,
    $inspectMessage,
    $preUpgrade,
    $query,
    $update,
    ic,
    Manual
} from 'azle';
import {
    acceptAllThenRejectAll,
    allowAll,
    allowModifyStateGuarded,
    unpassable,
    incrementCounterAndAllowAll,
    preventUpgrades,
    returnInvalidType,
    returnNonGuardResultObject,
    returnNonNullOkValue,
    returnNonStringErrValue,
    throwCustomError,
    throwString
} from './guards';
import { State, state } from './state';

$query;
export function getState(): State {
    return state;
}

// #region Guarded functions are called
$inspectMessage({ guard: allowModifyStateGuarded });
export function inspectMessage(): void {
    console.log('inspectMessage called');

    if (ic.methodName() === 'modifyStateGuarded') {
        console.log(`Method ${ic.methodName()} allowed by inspectMessage`);
        ic.acceptMessage();
    } else {
        console.log(`Method ${ic.methodName()} rejected by inspectMessage`);
    }
}

$heartbeat({ guard: acceptAllThenRejectAll });
export function heartbeat(): void {
    console.log('heartbeat called');
}

$preUpgrade({ guard: preventUpgrades });
export function preUpgrade(): void {
    console.log('preUpgrade called');
}

$query;
export function identifierAnnotation(): boolean {
    console.log('identifierAnnotation called');
    return true;
}

$query();
export function callExpressionWithoutOptionsObject(): boolean {
    console.log('callExpressionWithoutOptionsObject called');
    return true;
}

$query({});
export function callExpressionWithEmptyOptionsObject(): boolean {
    console.log('callExpressionWithEmptyOptionsObject called');
    return true;
}

$query({ guard: allowAll });
export function looselyGuarded(): boolean {
    console.log('looselyGuarded called');
    return true;
}

$query({ guard: allowAll });
export function looselyGuardedManual(): Manual<boolean> {
    console.log('looselyGuardedManual called');
    ic.reply(true);
}

// prettier-ignore
$query({ "guard": allowAll });
export function looselyGuardedWithGuardOptionKeyAsString(): boolean {
    console.log('looselyGuardedWithGuardOptionKeyAsString called');
    return true;
}

$update({ guard: incrementCounterAndAllowAll });
export function modifyStateGuarded(): boolean {
    console.log('modifyStateGuarded called');
    return true;
}

$update({ guard: incrementCounterAndAllowAll });
export function unallowedMethod(): boolean {
    console.log('modifyStateGuarded called');
    return true;
}
// #endregion Guarded functions are called

// #region Execution halted by guard function
$query({ guard: unpassable });
export function tightlyGuarded(): boolean {
    console.log('tightlyGuarded called');
    return true;
}

$query({ guard: throwString });
export function errorStringGuarded(): boolean {
    console.log('errorStringGuarded called');
    return true;
}

$query({ guard: throwCustomError });
export function customErrorGuarded(): boolean {
    console.log('customErrorGuarded called');
    return true;
}
// #endregion Execution halted by guard functions

// #region Execution halted by runtime error
$query({ guard: returnInvalidType });
export function invalidReturnTypeGuarded(): boolean {
    console.log('invalidReturnTypeGuarded called');
    return true;
}

$query({ guard: returnNonGuardResultObject });
export function badObjectGuarded(): boolean {
    console.log('badObjectGuarded called');
    return true;
}

$query({ guard: returnNonNullOkValue });
export function nonNullOkValueGuarded(): boolean {
    console.log('nonNullOkValueGuarded called');
    return true;
}

$query({ guard: returnNonStringErrValue });
export function nonStringErrValueGuarded(): boolean {
    console.log('nonStringErrValueGuarded called');
    return true;
}
// #endregion Execution halted by runtime error
