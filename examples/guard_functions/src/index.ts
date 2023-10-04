import { bool, Canister, ic, Manual, nat32, query, update } from 'azle';
import {
    allowAll,
    incrementCounterAndAllowAll,
    returnNonStringErrValue,
    throwCustomError,
    throwString,
    unpassable
} from './guards';

export let state = {
    counter: 0,
    heartbeatTick: 0
};

export default Canister({
    getCounter: query([], nat32, () => {
        return state.counter;
    }),
    identifierAnnotation: query([], bool, () => {
        console.log('identifierAnnotation called');
        return true;
    }),
    callExpressionWithoutOptionsObject: query([], bool, () => {
        console.log('callExpressionWithoutOptionsObject called');
        return true;
    }),
    callExpressionWithEmptyOptionsObject: query(
        [],
        bool,
        () => {
            console.log('callExpressionWithEmptyOptionsObject called');
            return true;
        },
        {}
    ),
    looselyGuarded: query(
        [],
        bool,
        () => {
            console.log('looselyGuarded called');
            return true;
        },
        { guard: allowAll }
    ),
    looselyGuardedManual: query(
        [],
        Manual(bool),
        () => {
            console.log('looselyGuardedManual called');
            ic.reply(true, bool);
        },
        { manual: true, guard: allowAll }
    ),
    looselyGuardedWithGuardOptionKeyAsString: query(
        [],
        bool,
        () => {
            console.log('looselyGuardedWithGuardOptionKeyAsString called');
            return true;
        },
        { guard: allowAll }
    ),
    modifyStateGuarded: update(
        [],
        bool,
        () => {
            console.log('modifyStateGuarded called');
            return true;
        },
        { guard: incrementCounterAndAllowAll }
    ),
    tightlyGuarded: query(
        [],
        bool,
        () => {
            console.log('tightlyGuarded called');
            return true;
        },
        { guard: unpassable }
    ),
    errorStringGuarded: query(
        [],
        bool,
        () => {
            console.log('errorStringGuarded called');
            return true;
        },
        { guard: throwString }
    ),
    customErrorGuarded: query(
        [],
        bool,
        () => {
            console.log('customErrorGuarded called');
            return true;
        },
        { guard: throwCustomError }
    ),
    nonStringErrValueGuarded: query(
        [],
        bool,
        () => {
            console.log('nonStringErrValueGuarded called');
            return true;
        },
        { guard: returnNonStringErrValue }
    )
});
