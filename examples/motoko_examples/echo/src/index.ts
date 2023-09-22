import { query, Service, text } from 'azle';

export default Service({
    say: query([text], text, (phrase) => {
        return phrase;
    })
});
