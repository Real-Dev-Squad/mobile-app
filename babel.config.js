module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
