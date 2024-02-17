require('ts-node').register({
    transpileOnly: true,
    ignore: [`node_modules/(?!azle)`],
    compilerOptions: {
        module: 'commonjs',
        allowJs: true
    }
});
require('./file_watcher.ts');
