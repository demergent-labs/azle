import { pathToFileURL } from 'url';
import { readFileSync } from 'fs';

function main(): void {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));

    const version = packageJson?.azle?.globalDependencies?.node;

    if (version !== undefined) {
        process.stdout.write(version);
    } else {
        throw new Error(`node version not found in azle.globalDependencies`);
    }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
