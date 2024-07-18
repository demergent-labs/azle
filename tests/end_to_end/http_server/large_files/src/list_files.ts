import { id } from 'azle';
import { readdir, stat } from 'fs/promises';
import { basename, join } from 'path';

export async function ls(
    path: string = '.',
    recursive: boolean = false
): Promise<string> {
    const stats = await stat(path);

    if (!stats.isDirectory()) {
        return `${await getFileDetails(path, await getSizePadding(path))}\n`;
    }

    let result = '';
    const items = await sortDirContents(path);
    for (const item of items) {
        const fullPath = join(path, item);

        result += `${await getFileDetails(
            fullPath,
            await getSizePadding(path)
        )}\n`;
    }

    if (recursive) {
        result += '\n';
        for (const item of items) {
            const fullPath = join(path, item);
            const stats = await stat(fullPath);
            if (stats.isDirectory()) {
                result += `${fullPath}\n${await ls(fullPath, recursive)}\n`;
            }
        }
    }
    return result;
}

export async function tree(
    dirPath: string = '.',
    indent: string = ''
): Promise<string> {
    let result = '';
    const items = await sortDirContents(dirPath);
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const fullPath = join(dirPath, item);
        const stats = await stat(fullPath);
        const isLastItem = i === items.length - 1;
        const newIndent = indent + (isLastItem ? '    ' : '│   ');

        result += `${indent + (isLastItem ? '└── ' : '├── ') + item}\n`;

        if (stats.isDirectory()) {
            result += await tree(fullPath, newIndent);
        }
    }
    return result;
}

export async function lsHtml(
    path: string = '.',
    recursive: boolean = false
): Promise<string> {
    const stats = await stat(path);

    if (!stats.isDirectory()) {
        return `<ul>${createHtmlListItem(path, false)}</ul>\n`;
    }

    let result = '<ul>';
    const items = await sortDirContents(path);
    for (const item of items) {
        const fullPath = join(path, item);
        const isDirectory = (await stat(fullPath)).isDirectory();
        result += createHtmlListItem(fullPath, isDirectory);
        const stats = await stat(fullPath);
        if (recursive && stats.isDirectory()) {
            result += `${await lsHtml(fullPath, recursive)}`;
        }
    }

    result += '</ul>';
    return result;
}

function createHtmlListItem(path: string, isDirectory: boolean): string {
    const link = isDirectory
        ? `/lsHtml?path=${encodeURIComponent(path)}`
        : `/read-file?path=${encodeURIComponent(path)}`;
    return `<li><a href="${link}">${basename(path)}</a></li>`;
}

async function getSizePadding(dirPath: string): Promise<number> {
    const stats = await stat(dirPath);
    if (!stats.isDirectory()) {
        return stats.size.toString().length;
    }

    let biggest = 0;
    const items = await readdir(dirPath);
    for (const item of items) {
        const filePath = join(dirPath, item);
        const stats = await stat(filePath);
        if (stats.size > biggest) {
            biggest = stats.size;
        }
    }
    return biggest.toString().length;
}

function padString(str: string, length: number): string {
    // Calculate the number of spaces needed to pad
    let padding = length - str.length;

    // If padding is less than or equal to 0, return the original string
    if (padding <= 0) {
        return str;
    }

    // Create a string with the necessary number of spaces
    let paddedString = ' '.repeat(padding) + str;

    return paddedString;
}

async function getFileDetails(
    filePath: string,
    sizePadding: number
): Promise<string> {
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
    const size = padString(stats.size.toString(), sizePadding);

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
