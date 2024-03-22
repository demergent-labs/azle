import { Unit, generateFileOfSize, toBytes } from 'azle/scripts/file_generator';
import { join } from 'path';

export async function generateTestFileOfSize(
    size: number,
    unit: Unit,
    dir: string = 'auto'
) {
    const autoDir = join('assets', dir);
    const path = join(autoDir, `test${size}${unit}`);
    const fileSize = toBytes(size, unit);
    await generateFileOfSize(path, fileSize);
}
