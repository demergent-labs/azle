import { IDL, query, reply, update } from 'azle';

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

export default class {
    @query([], IDL.Nat32)
    getCounter(): number {
        return state.counter;
    }

    @query([], IDL.Bool)
    noOptionsObject(): boolean {
        console.info('noOptionsObject called');
        return true;
    }

    @query([], IDL.Bool, {})
    emptyOptionsObject() {
        console.info('emptyOptionsObject called');
        return true;
    }

    @query([], IDL.Bool, { guard: allowAll })
    looselyGuarded() {
        console.info('looselyGuarded called');
        return true;
    }

    @query([], IDL.Bool, { manual: true, guard: allowAll })
    looselyGuardedManual() {
        console.info('looselyGuardedManual called');
        reply(true, IDL.Bool);
    }

    @query(
        [],
        IDL.Bool,
        // prettier-ignore
        { 'guard': allowAll }
    )
    looselyGuardedWithGuardOptionKeyAsString() {
        console.info('looselyGuardedWithGuardOptionKeyAsString called');
        return true;
    }

    @update([], IDL.Bool, { guard: incrementCounterAndAllowAll })
    modifyStateGuarded() {
        console.info('modifyStateGuarded called');
        return true;
    }

    @query([], IDL.Bool, { guard: unpassable })
    tightlyGuarded() {
        console.info('tightlyGuarded called');
        return true;
    }

    @query([], IDL.Bool, { guard: throwString })
    errorStringGuarded() {
        console.info('errorStringGuarded called');
        return true;
    }

    @query([], IDL.Bool, { guard: throwCustomError })
    customErrorGuarded() {
        console.info('customErrorGuarded called');
        return true;
    }

    @query([], IDL.Bool, { guard: returnNonStringErrValue })
    nonStringErrValueGuarded() {
        console.info('nonStringErrValueGuarded called');
        return true;
    }
}
