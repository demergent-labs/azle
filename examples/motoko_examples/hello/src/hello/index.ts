import { query, Service, text } from 'azle';

export default Service({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    })
});
