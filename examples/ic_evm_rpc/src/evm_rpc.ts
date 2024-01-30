import { Canister, update, text } from 'azle';

export default Canister({
    test: update([text], text, (message) => {
        return message;
    })
});
