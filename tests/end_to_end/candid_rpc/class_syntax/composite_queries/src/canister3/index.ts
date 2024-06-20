import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    deepQuery(): string {
        return 'Hello from Canister 3';
    }
}
