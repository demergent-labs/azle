import { Canister, query, Void } from 'azle';

export default Canister({
    main: query([], Void, () => {
        console.log('Hello World!');
    })
});
