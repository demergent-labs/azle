import {
    Canister,
    ic,
    init,
    Manual,
    nat,
    Principal,
    query,
    text,
    update
} from 'azle';
import Canister3 from '../canister3';

let canister3: typeof Canister3;
let counter: nat = 0n;

export default Canister({
    init: init([], () => {
        canister3 = Canister3(
            Principal.fromText(
                process.env.CANISTER3_PRINCIPAL ??
                    ic.trap('process.env.CANISTER3_PRINCIPAL is undefined')
            )
        );
    }),
    // TODO is this supposed to be a query?
    incCounter: query([], nat, () => {
        counter += 1n;
        return counter;
    }),
    simpleQuery: query([], text, () => {
        return 'Hello from Canister 2';
    }),
    updateQuery: update([], text, () => {
        return 'Hello from a Canister 2 update';
    }),
    manualQuery: query(
        [],
        Manual(text),
        () => {
            ic.reply('Hello from Canister 2 manual query', text);
        },
        { manual: true }
    ),
    deepQuery: query([], text, async () => {
        return await ic.call(canister3.deepQuery);
    })
});
