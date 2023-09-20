import { query, Service, text } from 'azle';

export default Service({
    simpleQuery: query([], text, () => {
        return 'This is a query function';
    })
});
