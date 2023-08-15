// Where there are conflicting local definitions

// Expectations:
// 1. Not valid compilation

// @ts-expect-error
export type text = boolean;
// @ts-expect-error
export type text = number;
