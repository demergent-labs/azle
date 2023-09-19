import { bool, ic, Manual, nat32, query, Service, update } from 'azle';
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

export default class extends Service {
    @query([], nat32)
    getCounter(): nat32 {
        return state.counter;
    }

    @query([], bool)
    identifierAnnotation(): bool {
        console.log('identifierAnnotation called');
        return true;
    }

    @query([], bool)
    callExpressionWithoutOptionsObject(): bool {
        console.log('callExpressionWithoutOptionsObject called');
        return true;
    }

    @query([], bool, {})
    callExpressionWithEmptyOptionsObject(): bool {
        console.log('callExpressionWithEmptyOptionsObject called');
        return true;
    }

    @query([], bool, { guard: allowAll })
    looselyGuarded(): bool {
        console.log('looselyGuarded called');
        return true;
    }

    @query([], bool, { manual: true, guard: allowAll })
    looselyGuardedManual(): Manual<bool> {
        console.log('looselyGuardedManual called');
        ic.reply(true, bool);
    }

    // prettier-ignore
    @query([], bool, { "guard": allowAll })
    looselyGuardedWithGuardOptionKeyAsString(): bool {
        console.log('looselyGuardedWithGuardOptionKeyAsString called');
        return true;
    }

    @update([], bool, { guard: incrementCounterAndAllowAll })
    modifyStateGuarded(): bool {
        console.log('modifyStateGuarded called');
        return true;
    }

    @query([], bool, { guard: unpassable })
    tightlyGuarded(): bool {
        console.log('tightlyGuarded called');
        return true;
    }

    @query([], bool, { guard: throwString })
    errorStringGuarded(): bool {
        console.log('errorStringGuarded called');
        return true;
    }

    @query([], bool, { guard: throwCustomError })
    customErrorGuarded(): bool {
        console.log('customErrorGuarded called');
        return true;
    }

    @query([], bool, { guard: returnNonStringErrValue })
    nonStringErrValueGuarded(): bool {
        console.log('nonStringErrValueGuarded called');
        return true;
    }
}
