var fs = require('fs');

// Function to create a file of a specific size in bytes
function createFileOfSize(filename, sizeInBytes) {
    var buffer = Buffer.alloc(sizeInBytes);
    fs.writeFileSync(filename, buffer);
}

// Parse size from string with optional unit suffix (KB, MB, GB)
function parseSize(sizeString) {
    var sizeRegex = /^(\d+(?:\.\d+)?)([kmg]?)$/i;
    var match = sizeString.match(sizeRegex);
    if (!match) {
        throw new Error(
            'Invalid size format. Please use format like 1024, 1.5KB, 3MB, 2GB.'
        );
    }

    var size = parseFloat(match[1]);
    var unit = match[2].toLowerCase();
    switch (unit) {
        case 'k':
            size *= 1024;
            break;
        case 'm':
            size *= 1024 * 1024;
            break;
        case 'g':
            size *= 1024 * 1024 * 1024;
            break;
    }
    return size;
}

// Extract filename and size from command line arguments
var args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node createFile.js <filename> <size>');
    process.exit(1);
}

var filename = args[0];
var sizeString = args[1];
var sizeInBytes = parseSize(sizeString);

// Check if size is a valid number
if (isNaN(sizeInBytes) || sizeInBytes <= 0) {
    console.error(
        'Invalid size. Please provide a positive integer for size or use a valid unit (B, KB, MB, GB).'
    );
    process.exit(1);
}

createFileOfSize(filename, sizeInBytes);
console.log(
    "File '" + filename + "' created with size " + sizeInBytes + ' bytes.'
);
