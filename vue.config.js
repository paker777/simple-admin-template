'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // 页面标题

// 如果端口设置为80，
// 使用管理员权限执行命令行。
// 例如，Mac: sudo npm run
// 可以通过以下方法修改端口:
// port = 9528 npm run dev或npm run dev——port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// 所有配置项说明都可以在https://cli.vuejs.org/config/中找到
module.exports = {
  /**
   *如果您计划将站点部署在子路径下，则需要设置publicPath。
   *例如GitHub Pages。如果您计划将站点部署到https://foo.github.io/bar/，
   *那么publicPath应该设置为“/bar/”。
   *在大多数情况下请使用“/”!!
   *详细信息:https://cli.vuejs.org/config/#publicpath
   **/
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // 配置跨域
      '/api': {
        target: `http://localhost:8080`, // 请求后台接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 重写请求
        }
      }
    }
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用程序的标题
    // 它可以在index.html中被访问以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 可以提高首屏速度，建议开启预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面很多时，会导致太多无意义的请求
    config.plugins.delete('prefetch')

    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // ' runtime '必须与runtimeChunk名称相同。默认为' runtime '
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // 只打包最初依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', // 将elementUI拆分为一个包
            priority: 20, // 重量需要大于libs和app，否则它将被包装成libs或app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应CNPM
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // 可以自定义规则
            minChunks: 3, //  最小公共数
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  }
}
