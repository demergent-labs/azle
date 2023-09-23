import { bool, query, Service, text, update } from 'azle';

export default Service({
    query1: query([], bool, () => {
        return true;
    }),
    update1: update([], text, () => {
        return 'SomeService update1';
    })
});
