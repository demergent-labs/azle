import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Create the dfx_generated directory if it doesn't exist
const dfxGeneratedDir = path.join(__dirname, 'dfx_generated');
if (!fs.existsSync(dfxGeneratedDir)) {
    fs.mkdirSync(dfxGeneratedDir, { recursive: true });
}

// Run any necessary setup commands here
execSync('dfx stop', { stdio: 'ignore' });
execSync('dfx start --background --clean');

try {
    execSync('dfx deploy');
} catch (error) {
    console.error('Error deploying canisters:', error);
    process.exit(1);
}
