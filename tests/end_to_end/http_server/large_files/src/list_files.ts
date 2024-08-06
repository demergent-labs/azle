import { id } from 'azle';
import { readdir, stat } from 'fs/promises';
import { basename, join } from 'path';

export async function ls(
    path: string = '.',
    recursive: boolean = false
): Promise<string> {
    const stats = await stat(path);

    if (!stats.isDirectory()) {
        return `<ul>${await createHtmlListItem(path, false)}</ul>\n`;
    }

    let result = '<ul>';
    const items = await sortDirContents(path);
    for (const item of items) {
        const fullPath = join(path, item);
        const isDirectory = (await stat(fullPath)).isDirectory();
        result += await createHtmlListItem(fullPath, isDirectory);
        const stats = await stat(fullPath);
        if (recursive && stats.isDirectory()) {
            result += `${await ls(fullPath, recursive)}`;
        }
    }

    result += '</ul>';
    return result;
}

async function createHtmlListItem(
    path: string,
    isDirectory: boolean
): Promise<string> {
    const link = isDirectory
        ? `/?path=${encodeURIComponent(path)}`
        : `/read-file?path=${encodeURIComponent(path)}`;
    const title = await getFileDetails(path);
    return `<li title="${title}"><a href="${link}">${basename(path)}</a></li>`;
}

async function getFileDetails(filePath: string): Promise<string> {
    // Get file statistics
    const stats = await stat(filePath);

    // Get file permissions in symbolic notation
    const permissions = (stats.mode & 0o777).toString(8);
    const symbolicPermissions = permissions.replace(/./g, (d: string) => {
        const lookup: { [key: string]: string } = {
            '0': '---',
            '1': '--x',
            '2': '-w-',
            '3': '-wx',
            '4': 'r--',
            '5': 'r-x',
            '6': 'rw-',
            '7': 'rwx'
        };
        return lookup[d] || '-';
    });
    const dir = stats.isDirectory() ? 'd' : '-';
    const fullPermissions = `${dir}${symbolicPermissions}`;

    // Get the number of hard links
    const hardLinks = stats.nlink;

    // Get owner and group names using 'id' command
    const owner = id();

    // Get file size
    const size = stats.size.toString();

    // Get last modification time
    const modTime = new Date(stats.mtime);
    const month = modTime.toLocaleString('default', { month: 'short' });
    const day = modTime.getDate();
    const time = `${modTime.getHours()}:${modTime.getMinutes()}`;

    // Format the output
    return `${fullPermissions}  ${hardLinks} ${owner}   ${size} ${month} ${day} ${time} ${basename(
        filePath
    )}`;
}

async function sortDirContents(currentPath: string): Promise<string[]> {
    const items = await readdir(currentPath);

    const directories: string[] = [];
    const files: string[] = [];

    for (const item of items) {
        const fullPath = join(currentPath, item);
        const stats = await stat(fullPath);
        if (stats.isDirectory()) {
            directories.push(item);
        } else {
            files.push(item);
        }
    }

    directories.sort((a, b) => a.localeCompare(b));
    files.sort((a, b) => a.localeCompare(b));

    return [...directories, ...files];
}
