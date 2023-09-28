import { Canister, Principal, Variant, nat, query, text } from 'azle';
import { Recursive } from 'azle';

// const MyCanister = Recursive(() =>
//     Canister({
//         myQuery: query([MyCanister], MyCanister, (param) => param, [
//             { name: MyCanister._azleName, idl: MyCanister.getIDL([]) }
//         ])
//     })
// );
const MyVariant = Recursive(() => Variant({ cool: nat, boy: MyVariant }));
const MyCanister = Recursive(() =>
    Canister({
        myQuery: query([MyCanister], MyCanister, (param) => param)
    })
);
// const MyPrincipal = Recursive(() => Principal);
// const MyRecCanister = Recursive(() => MyCanister);
// const MyCanister = Canister({
//     myQuery: query([MyRecCanister], MyRecCanister, (param) => param)
// });
// const MyCanister = Canister({
//     myQuery: query(
//         [Recursive(() => MyCanister)],
//         Recursive(() => MyCanister),
//         (param) => param
//     )
// });

export default Canister({
    simpleQuery: query([MyCanister], text, () => {
        return 'This is a query function';
    }),
    simpleCanister: query([MyCanister], MyCanister, (param) => {
        return param;
        return 'This is a query function';
    }),
    simpleVariant: query([MyVariant], MyVariant, (param) => param)
})();
