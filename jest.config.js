module.exports = {
  'preset': 'react-native',
  'transformIgnorePatterns': [
    'node_modules/(?!react-native|@react-native-community|@react-navigation)'
  ],
  'setupFiles': [
    'react-native-gesture-handler/jestSetup',
  ],
  'setupFilesAfterEnv': ['@testing-library/jest-native/extend-expect'],
  'timers': 'fake'
}