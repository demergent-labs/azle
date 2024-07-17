import { Canister, query, text, update, Void } from 'azle/experimental';

let currentMessage: string = '';

export default Canister({
    getCurrentMessage: query([], text, () => {
        return currentMessage;
    }),
    simpleUpdate: update([text], Void, (message) => {
        currentMessage = message;
    })
});
