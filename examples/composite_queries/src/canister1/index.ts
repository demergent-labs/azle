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
import Canister2 from '../canister2';

let canister2: typeof Canister2;
let counter: nat = 0n;

const CompQueryCanister = Canister({
    init: init([], () => {
        canister2 = Canister2(
            Principal.fromText(
                process.env.CANISTER2_PRINCIPAL ??
                    ic.trap('process.env.CANISTER2_PRINCIPAL is undefined')
            )
        );
    }),
    // Composite query calling a query
    simpleCompositeQuery: query([], text, async () => {
        return await ic.call(canister2.simpleQuery);
    }),
    // Composite query calling a manual query
    manualQuery: query([], text, async () => {
        return (await ic.call(canister2.manualQuery)) as unknown as string; // TODO is this the best we can do for the types in this situation?
    }),
    // Manual composite query calling a manual query
    totallyManualQuery: query(
        [],
        Manual(text),
        async () => {
            ic.reply(await ic.call(canister2.manualQuery), text);
        },
        { manual: true }
    ),
    // Composite query calling another composite query
    deepQuery: query([], text, async () => {
        return await ic.call(canister2.deepQuery);
    }),
    // Composite query calling an update method. SHOULDN'T WORK
    updateQuery: query([], text, async () => {
        return await ic.call(canister2.updateQuery);
    }),
    // Composite query being called by a query method. SHOULDN'T WORK
    simpleQuery: query([], text, async () => {
        return await ic.call(canister2.simpleQuery);
    }),
    // Composite query being called by an update method. SHOULDN'T WORK
    simpleUpdate: update([], text, async () => {
        return await ic.call(canister2.deepQuery);
    }),
    // Composite query that modifies the state. Should revert after the call is done
    incCounter: query([], nat, async () => {
        counter += 1n;

        return counter;
    }),
    // Composite query calling queries on the same canister
    incCanister1: query([], nat, async () => {
        const self: any = CompQueryCanister(ic.id());

        counter += 1n;

        const canister1AResult = await ic.call(self.incCounter);
        const canister1BResult = await ic.call(self.incCounter);

        return counter + canister1AResult + canister1BResult;
    }),
    // Composite query calling queries that modify the state
    incCanister2: query([], nat, async () => {
        counter += 1n;

        const canister2AResult = await ic.call(canister2.incCounter);
        const canister2BResult = await ic.call(canister2.incCounter);

        return counter + canister2AResult + canister2BResult;
    })
});

export default CompQueryCanister;
