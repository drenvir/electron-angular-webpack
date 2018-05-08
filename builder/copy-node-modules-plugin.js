"use strict";

const copyNodeModule = require('copy-node-modules');

class CopyNpmModulesPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.plugin("done", (stats) => {
            copyNodeModule(this.options.srcDir, this.options.dstDir, {
                devDependencies: false
            }, function (err, results) {
                if (err) {
                    console.error(err);
                    return;
                }
                for (var i in results) {
                    console.log('Package name:' + results[i].name + ' version:' + results[i].version);
                }
            });

        });
    }
}

module.exports = CopyNpmModulesPlugin;