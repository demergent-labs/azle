// TODO let's add more examples here, really test it out

import { bool, Null, Opt, query, Record, Service, text, Vec } from 'azle';

const Element = Record({
    id: text
});

const Head = Record({
    elements: Vec(Element)
});

const Html = Record({
    head: Opt(Head)
});

export default Service({
    getHtml: query([], Html, () => {
        return {
            head: []
        };
    }),

    getHead: query([], Opt(Head), () => {
        return [
            {
                elements: []
            }
        ];
    }),

    getHeadWithElements: query([], Opt(Head), () => {
        return [
            {
                elements: [
                    {
                        id: '0'
                    }
                ]
            }
        ];
    }),

    getElement: query([Opt(Opt(Element))], Opt(Opt(Element)), (element) => {
        return element;
    }),

    getNull: query([], Null, () => {
        return null;
    }),

    getOptNull: query([], Opt(text), () => {
        return [];
    }),

    stringToBoolean: query([Opt(text)], bool, (optString) => {
        if (optString.length > 0) {
            return true;
        }
        return false;
    })
});
