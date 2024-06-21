// TODO let's add more examples here, really test it out

import { bool, None, Null, Opt, query, Record, Some, text, Vec } from 'azle';

const Element = Record({
    id: text
});

const Head = Record({
    elements: Vec(Element)
});

const Html = Record({
    head: Opt(Head)
});

export default class {
    @query([], Html)
    getHtml() {
        return {
            head: None
        };
    }
    @query([], Opt(Head))
    getHead() {
        return Some({
            elements: []
        });
    }
    @query([], Opt(Head))
    getHeadWithElements() {
        return Some({
            elements: [
                {
                    id: '0'
                }
            ]
        });
    }
    @query([Opt(Opt(Element))], Opt(Opt(Element)))
    getElement(element) {
        return element;
    }
    @query([], Null)
    getNull() {
        return null;
    }
    @query([], Opt(text))
    getOptNull() {
        return None;
    }
    @query([Opt(text)], bool)
    stringToBoolean(optString) {
        if ('None' in optString) {
            return false;
        }
        return true;
    }
}
