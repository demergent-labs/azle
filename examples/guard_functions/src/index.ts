import { $query, GuardResult } from 'azle';

// function allow_all(): GuardResult {
//     return GuardResult.ok;
// }

// $query({ guard: 'allow_all' });
$query;
export function loosely_guarded(): boolean {
    console.log('loosely_guarded was called');
    return true;
}
