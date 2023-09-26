import { bool, query, Service, update, Void } from 'azle';

let notified: boolean = false;

export default Service({
    receiveNotification: update([], Void, () => {
        notified = true;
    }),
    getNotified: query([], bool, () => {
        return notified;
    })
});
