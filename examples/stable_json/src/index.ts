import { Canister, query, StableBTreeMap, StableJson, text, Void } from 'azle';

// function Json<T>(value: T): T {
//     return {
//         toBytes
//     };
// }

// let map = StableBTreeMap(text, text, 0);
// let map1 = StableBTreeMap(Json(text), Json(text), 0);

export default Canister({
    test: query([], Void, () => {
        // map1.insert('0', '0');
    })
});
