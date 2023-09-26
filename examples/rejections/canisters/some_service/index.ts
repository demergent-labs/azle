import { bool, empty, ic, Manual, query, Service, text } from 'azle';

export default Service({
    reject: query(
        [text],
        Manual(empty),
        (message) => {
            ic.reject(message);
        },
        { manual: true }
    ),

    accept: query([], bool, () => {
        return true;
    }),

    error: query(
        [],
        Manual(empty),
        () => {
            // This errors because neither ic.reject nor ic.reply were called
        },
        { manual: true }
    )
});
