const bootstrapSassAbstractsImports = require('vue-cli-plugin-bootstrap-vue/sassAbstractsImports.js')
module.exports = {
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             additionalData: bootstrapSassAbstractsImports.join('\n')
    //         },
    //         scss: {
    //             additionalData: [...bootstrapSassAbstractsImports, ''].join(';\n')
    //         }
    //     }
    // },
    configureWebpack: {
        devtool: "source-map",
    },
    devServer: {
        proxy:
        // "http://localhost:5050"
        {
            "^/server": {
                target: "http://localhost:5050",
                pathRewrite: {
                    "^/server": "",
                },
            }
        }
    }
}