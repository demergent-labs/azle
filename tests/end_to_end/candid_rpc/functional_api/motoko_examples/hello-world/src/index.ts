import { Canister, query, Void } from 'azle/experimental';

export default Canister({
    main: query([], Void, () => {
        console.info('Hello World!');
    })
});
