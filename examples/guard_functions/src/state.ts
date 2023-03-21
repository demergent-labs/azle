import { Record, int32 } from 'azle';

export type State = Record<{
    counter: int32;
    heartbeatTick: int32;
}>;

export let state: State = {
    counter: 0,
    heartbeatTick: 0
};
