// TODO let's add more examples here, really test it out

import {
    bool,
    Canister,
    None,
    Null,
    Opt,
    query,
    Record,
    Some,
    text,
    Vec
} from 'azle';

const Element = Record({
    id: text
});

const Head = Record({
    elements: Vec(Element)
});

const Html = Record({
    head: Opt(Head)
});

export default Canister({
    getHtml: query([], Html, () => {
        return {
            head: None
        };
    }),
    getHead: query([], Opt(Head), () => {
        return Some({
            elements: []
        });
    }),
    getHeadWithElements: query([], Opt(Head), () => {
        return Some({
            elements: [
                {
                    id: '0'
                }
            ]
        });
    }),
    getElement: query([Opt(Opt(Element))], Opt(Opt(Element)), (element) => {
        return element;
    }),
    getNull: query([], Null, () => {
        return null;
    }),
    getOptNull: query([], Opt(text), () => {
        return None;
    }),
    stringToBoolean: query([Opt(text)], bool, (optString) => {
        if ('None' in optString) {
            return false;
        }
        return true;
    })
});
