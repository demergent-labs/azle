import { Canister, query, Void } from 'azle/experimental';

export default Canister({
    main: query([], Void, () => {
        console.log('Hello World!');
    })
});
