import { hashFile } from '.';

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const fileHash = await hashFile(filePath);
    console.info(fileHash.toString('hex'));
}

main();
