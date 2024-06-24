import {
    bool,
    Canister,
    ic,
    Manual,
    nat32,
    query,
    update
} from 'azle/experimental';

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
    noOptionsObject: query([], bool, () => {
        console.info('noOptionsObject called');
        return true;
    }),
    emptyOptionsObject: query(
        [],
        bool,
        () => {
            console.info('emptyOptionsObject called');
            return true;
        },
        {}
    ),
    looselyGuarded: query(
        [],
        bool,
        () => {
            console.info('looselyGuarded called');
            return true;
        },
        { guard: allowAll }
    ),
    looselyGuardedManual: query(
        [],
        Manual(bool),
        () => {
            console.info('looselyGuardedManual called');
            ic.reply(true, bool);
        },
        { manual: true, guard: allowAll }
    ),
    looselyGuardedWithGuardOptionKeyAsString: query(
        [],
        bool,
        () => {
            console.info('looselyGuardedWithGuardOptionKeyAsString called');
            return true;
        },
        // prettier-ignore
        { 'guard': allowAll }
    ),
    modifyStateGuarded: update(
        [],
        bool,
        () => {
            console.info('modifyStateGuarded called');
            return true;
        },
        { guard: incrementCounterAndAllowAll }
    ),
    tightlyGuarded: query(
        [],
        bool,
        () => {
            console.info('tightlyGuarded called');
            return true;
        },
        { guard: unpassable }
    ),
    errorStringGuarded: query(
        [],
        bool,
        () => {
            console.info('errorStringGuarded called');
            return true;
        },
        { guard: throwString }
    ),
    customErrorGuarded: query(
        [],
        bool,
        () => {
            console.info('customErrorGuarded called');
            return true;
        },
        { guard: throwCustomError }
    ),
    nonStringErrValueGuarded: query(
        [],
        bool,
        () => {
            console.info('nonStringErrValueGuarded called');
            return true;
        },
        { guard: returnNonStringErrValue }
    )
});
