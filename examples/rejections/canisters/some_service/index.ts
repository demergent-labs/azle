import { bool, empty, ic, query, Service, text } from 'azle';

type Manual<T> = void;

export default class extends Service {
    @query([text], empty, { manual: true })
    reject(message: text): Manual<empty> {
        ic.reject(message);
    }

    @query([], bool)
    accept(): bool {
        return true;
    }

    @query([], empty, { manual: true })
    error(): Manual<empty> {
        // This errors because neither ic.reject nor ic.reply were called
    }
}
