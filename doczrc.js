/**
 * Docz Configuration File:
 * https://www.docz.site/docs/project-configuration
 */

import { css } from 'docz-plugin-css'

export default {
  dest: 'example/build',
  public: '/public',
  indexHtml: 'src/__docs__/index.html',
  // Limited support for importing `.styl` files
  codeSandbox: false,
  // https://github.com/pedronauck/docz/pull/849/files
  // Because we re-export using `index.js` files
  notUseSpecifiers: true,
  // filterComponents: files =>
  //   files.filter(filepath =>
  //     /\/[A-Z]\w*(\/index)?\.(js|jsx|ts|tsx)$/.test(filepath)
  //   ),
  menu: [
    'Introduction',
    'Getting Started',
    { name: 'Elements', menu: ['Form / Select'] },
    {
      name: 'Components',
      menu: [
        'CINE Dialog',
        'Layout Button',
        'Measurement Table',
        'Overlay Trigger',
        'Quick Switch',
        'Rounded Button Group',
        'Select Tree',
        'Simple Dialog',
        'Study Browser',
        'Study List',
        'Table List',
        'Toolbar Section',
        'User Preferences Modal',
      ],
    },
    'Styling & Theming',
    'Compatibility',
  ],
  // Rollup Aliases?
  // https://github.com/pedronauck/docz/issues/373
  plugins: [
    // CSS
    css(),
    // Stylus
    css({
      preprocessor: 'stylus',
      cssmodules: false,
    }),
  ],
  // `docz` uses file-loader to pull in SVGs. This kills our icons before
  // They can be picked up by our `babel-plugin-inline-react-svg` dependency
  // You can see where it's configured here:
  // https://github.com/pedronauck/docz/blob/f72624d0aa5231dab17e1770e8d36be920f590a2/core/docz-core/src/bundler/loaders.ts#L135-L144
  // How we delete our rule:
  // https://github.com/neutrinojs/webpack-chain/issues/48
  onCreateWebpackChain: config => {
    config.module.rules.delete('svg')

    // config.module
    //   .rule('svg')
    //   .test(/\.(svg)(\?.*)?$/)
    //   .use('file-loader')
    //   .loader(require.resolve('file-loader'))
    //   .options({
    //     name: `static/img/[name].[ext]`,
    //   })
  },
  modifyBabelRc: babelrc => {
    const newBabelRc = {
      ...babelrc,
      plugins: [
        ...babelrc.plugins,
        require.resolve('babel-plugin-inline-react-svg'),
      ],
    }
    return newBabelRc
  },
}

/*
 * Alternative ways to extend/modify underlying webpack config
 *
modifyBundlerConfig: (config) => {
  config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    })

  return config
}
  *
  *
  *
onCreateWebpackChain: config => {
  config.module
    .rule('css')
      .test(/\.css$/)
        .use('css-loader')
        .loader('css-loader')
        .options({ sourceMap: false,
                    importLoaders: 2 })
}
*/
