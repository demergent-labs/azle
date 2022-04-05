import { execSync } from 'child_process';
import { Rust } from '../../types';

// TODO handle errors
// TODO is it dangerous to pass the candidPath in like this?
export function compileCandidToRustTypes(candidPath: string): Rust {
    return execSync(`./target/bin/didc bind ${candidPath} -t rs`).toString();
}