import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Element {
    id: string;
}
export interface Head {
    elements: Array<Element>;
}
export interface Html {
    head: [] | [Head];
}
export interface _SERVICE {
    get_element: ActorMethod<[[] | [[] | [Element]]], [] | [[] | [Element]]>;
    get_head: ActorMethod<[], [] | [Head]>;
    get_head_with_elements: ActorMethod<[], [] | [Head]>;
    get_html: ActorMethod<[], Html>;
}
