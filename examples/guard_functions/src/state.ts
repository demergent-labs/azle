import { Record, int32 } from 'azle';

export type State = Record<{
    counter: int32;
}>;

export let state: State = {
    counter: 0
};
