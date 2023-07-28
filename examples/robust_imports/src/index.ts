// Named Imports
export * from './import_coverage';
export * from './azle_coverage';
export * from './type_alias_decls';
export * from './ts_primitives';

// Not Named Imports
import './azle_coverage/fruit'; // Shouldn't do anything. It's just here to make sure it doesn't do anything
