module.exports = {
  'presets': ['module:metro-react-native-babel-preset'],
  'env': {
    'production': {
      'plugins': ['transform-remove-console']
    }
  },
  'plugins': [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-modules-commonjs'
  ]
}