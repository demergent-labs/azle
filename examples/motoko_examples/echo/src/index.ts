import { Canister, query, text } from 'azle';

export default Canister({
    say: query([text], text, (phrase) => {
        return phrase;
    })
});
