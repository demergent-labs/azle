import { query, Service, Void } from 'azle';

export default Service({
    main: query([], Void, () => {
        console.log('Hello World!');
    })
});
