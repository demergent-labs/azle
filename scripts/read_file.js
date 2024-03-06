var fs = require('fs');

function bytesToHex(bytes) {
    return Array.from(bytes)
        .map((byte) => `0${byte.toString(16)}`.slice(-2))
        .join('');
}

var filePath = process.argv.slice(2)[0]; // Get the first argument (excluding script name)

if (!filePath) {
    console.error('Please provide a file path as an argument.');
    process.exit(1);
}

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        process.exit(1);
    }

    var hexString = bytesToHex(data);
    console.log(hexString);
});
