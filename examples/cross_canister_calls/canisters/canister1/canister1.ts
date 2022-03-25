import {
    Query,
    Update,
    UpdateAsync,
    nat8,
    ic
} from 'azle';

let message: string = '';

export function read(): Query<string> {
    return message;
}

// export function write(data: string): Update<void> {
//     message = data;
// }

// export function* randomness(): UpdateAsync<nat8[]> {
//     return yield ic.rawRand().next().value;
// }