import { hashFileByParts } from '.';

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const fileHash = await hashFileByParts(filePath);
    console.info(fileHash.toString('hex'));
}

main();
