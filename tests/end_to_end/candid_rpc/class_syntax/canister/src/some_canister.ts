import { IDL, query, update } from 'azle';

export default class {
    @query([], bool)
    query1() {
        return true;
    }
    @update([], IDL.Text)
    update1() {
        return 'SomeCanister update1';
    }
}
