import { msgReject } from 'azle';
import { bool, Canister, empty, Manual, query, text } from 'azle/experimental';

export default Canister({
    reject: query(
        [text],
        Manual(empty),
        (message) => {
            msgReject(message);
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
            // This errors because neither msgReject nor msgReply were called
        },
        { manual: true }
    )
});
