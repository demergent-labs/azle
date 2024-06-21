import { bool, Canister, query, text, update } from 'azle/experimental';

export default class {
    @query([], bool)
    query1() {
        return true;
    }
    @update([], text)
    update1() {
        return 'SomeCanister update1';
    }
}
