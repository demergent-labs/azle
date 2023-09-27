import { bool, Canister, query, update, Void } from 'azle';

let notified: boolean = false;

export default Canister({
    receiveNotification: update([], Void, () => {
        notified = true;
    }),
    getNotified: query([], bool, () => {
        return notified;
    })
});
