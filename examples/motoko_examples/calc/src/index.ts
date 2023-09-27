import { Canister, int, None, Opt, Some, update, Void } from 'azle';

let cell: int = 0n;

export default Canister({
    add: update([int], int, (n) => {
        cell += n;

        return cell;
    }),
    sub: update([int], int, (n) => {
        cell -= n;

        return cell;
    }),
    mul: update([int], int, (n) => {
        cell *= n;

        return cell;
    }),
    div: update([int], Opt(int), (n) => {
        if (n === 0n) {
            return None;
        } else {
            cell /= n;
            return Some(cell);
        }
    }),
    clearall: update([], Void, () => {
        cell = 0n;
    })
});
