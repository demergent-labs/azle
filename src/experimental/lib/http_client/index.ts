// I am not sure if this side-effect import is necessary
// but we must ensure that no bundler drops the ./fetch_ic file
// because we are overwridding globalThis.fetch in there
import './fetch_ic';
export * from './fetch_ic';
export * from './to_jwt';
