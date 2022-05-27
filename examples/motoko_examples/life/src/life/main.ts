import * as Grid from './grid';
import * as Random from './random';
import * as State from './state';
import { Update, Query } from 'azle';

const state = (() => {
    const rand = Random.create();
    return State.create(64, () => rand.next() % 2 === 1);
})();

let cur = new Grid.Grid(state);
let nxt = new Grid.Grid(State.create(cur.size(), () => false));

export function next(): Update<string> {
    cur.next(nxt);
    const temp = cur;
    cur = nxt;
    nxt = temp;
    return cur.toText();
}

export function current(): Query<string> {
    return cur.toText();
}
