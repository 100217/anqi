const path = require('path')

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', path.resolve(__dirname, './src'))
            .set('@api', path.resolve(__dirname, './src/api'))
    },
    devServer: {
        port: 8080,
        compress: true,
        proxy: {
            "/api" : {
                "target": 'http://42.192.38.61:8083',
                "changeOrigin": true,
                "pathRewrite": {
                    "^/api" : "/"
                }
            }
        },
    },
}