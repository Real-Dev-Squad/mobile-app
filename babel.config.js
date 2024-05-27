module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    // NOTE: react-native-reanimated plugin should be the last plugin
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
        globals: ['__scanQRCodes'],
      },
    ],
  ],
};
