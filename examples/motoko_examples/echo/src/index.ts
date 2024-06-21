import { Canister, query, text } from 'azle/experimental';

export default Canister({
    say: query([text], text, (phrase) => {
        return phrase;
    })
});
