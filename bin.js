#!/usr/bin/env node

require('ts-node').register({
    transpileOnly: true,
    ignore: [`node_modules/(?!azle)`],
    compilerOptions: {
        module: 'commonjs',
        allowJs: true
    }
});
require('./src/compiler/index.ts');
