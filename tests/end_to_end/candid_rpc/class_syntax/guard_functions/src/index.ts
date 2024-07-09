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
    emptyOptionsObject(): boolean {
        console.info('emptyOptionsObject called');
        return true;
    }

    @query([], IDL.Bool, { guard: allowAll })
    looselyGuarded(): boolean {
        console.info('looselyGuarded called');
        return true;
    }

    @query([], IDL.Bool, { manual: true, guard: allowAll })
    looselyGuardedManual(): void {
        console.info('looselyGuardedManual called');
        reply(true, IDL.Bool);
    }

    @query(
        [],
        IDL.Bool,
        // prettier-ignore
        { 'guard': allowAll }
    )
    looselyGuardedWithGuardOptionKeyAsString(): boolean {
        console.info('looselyGuardedWithGuardOptionKeyAsString called');
        return true;
    }

    @update([], IDL.Bool, { guard: incrementCounterAndAllowAll })
    modifyStateGuarded(): boolean {
        console.info('modifyStateGuarded called');
        return true;
    }

    @query([], IDL.Bool, { guard: unpassable })
    tightlyGuarded(): boolean {
        console.info('tightlyGuarded called');
        return true;
    }

    @query([], IDL.Bool, { guard: throwString })
    errorStringGuarded(): boolean {
        console.info('errorStringGuarded called');
        return true;
    }

    @query([], IDL.Bool, { guard: throwCustomError })
    customErrorGuarded(): boolean {
        console.info('customErrorGuarded called');
        return true;
    }

    @query([], IDL.Bool, { guard: returnNonStringErrValue })
    nonStringErrValueGuarded(): boolean {
        console.info('nonStringErrValueGuarded called');
        return true;
    }
}
