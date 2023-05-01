// TODO let's add more examples here, really test it out

import { match, Opt, $query, Record, Vec } from 'azle';

type Html = Record<{
    head: Opt<Head>;
}>;

type Head = Record<{
    elements: Vec<Element>;
}>;

type Element = Record<{
    id: string;
}>;

$query;
export function getHtml(): Html {
    return {
        head: Opt.None
    };
}

$query;
export function getHead(): Opt<Head> {
    return Opt.Some({
        elements: []
    });
}

$query;
export function getHeadWithElements(): Opt<Head> {
    return Opt.Some({
        elements: [
            {
                id: '0'
            }
        ]
    });
}

$query;
export function getElement(element: Opt<Opt<Element>>): Opt<Opt<Element>> {
    return element;
}

$query;
export function getNull(): null {
    return null;
}

$query;
export function getOptNull(): Opt<string> {
    return Opt.None;
}

$query;
export function stringToBoolean(optString: Opt<string>): boolean {
    return match(optString, {
        Some: (_) => true,
        None: () => false
    });
}
