import { $query, GuardResult } from 'azle';

function allow_all(): GuardResult {
    return { ok: null };
}

$query({ guard: allow_all });
export function loosely_guarded(): boolean {
    console.log('loosely_guarded was called');
    return true;
}

function allow_none(): GuardResult {
    return { err: 'Precondition not met' };
}

$query({ guard: allow_none });
export function tightly_guarded(): boolean {
    console.log('tightly_guarded was called');
    return true;
}
