// Named Imports
export * from './import_coverage/import_coverage';
export * from './azle_coverage/azle_coverage';

// Not Named Imports
import './azle_coverage/fruit'; // Shouldn't do anything. It's just here to make sure it doesn't do anything
