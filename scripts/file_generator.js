var fs = require('fs');

// Function to create a file of a specific size in bytes
function createFileOfSize(filename, sizeInBytes) {
    var buffer = Buffer.alloc(sizeInBytes);
    fs.writeFileSync(filename, buffer);
}

// Extract filename and size from command line arguments
var args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node createFile.js <filename> <sizeInBytes>');
    process.exit(1);
}

var filename = args[0];
var sizeInBytes = parseInt(args[1]);

// Check if size is a valid number
if (isNaN(sizeInBytes) || sizeInBytes <= 0) {
    console.error(
        'Invalid size. Please provide a positive integer for sizeInBytes.'
    );
    process.exit(1);
}

createFileOfSize(filename, sizeInBytes);
console.log(
    "File '" + filename + "' created with size " + sizeInBytes + ' bytes.'
);
