import { Principal } from './';

export type Func<T> = T;

// TODO type these more strictly
export type Query<T extends (...args: any[]) => any> = [Principal, string];
export type Update<T extends (...args: any[]) => any> = [Principal, string];
export type Oneway<T extends (...args: any[]) => any> = [Principal, string];
