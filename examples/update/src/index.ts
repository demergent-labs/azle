import { query, Service, text, update, Void } from 'azle';

let currentMessage: string = '';

export default Service({
    getCurrentMessage: query([], text, () => {
        return currentMessage;
    }),
    simpleUpdate: update([text], Void, (message) => {
        currentMessage = message;
    })
});
