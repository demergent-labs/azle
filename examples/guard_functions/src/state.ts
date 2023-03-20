import { Record, int32 } from 'azle';

export type State = Record<{
    counter: int32;
    lastCalledMethod: string;
}>;

export let state: State = {
    counter: 0,
    lastCalledMethod: ''
};
