import { Canister, query, Void } from 'azle/experimental';

export default class {
    @query([], Void)
    main() {
        console.log('Hello World!');
    }
}
