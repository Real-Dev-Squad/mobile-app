module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // react-native-reanimated plugin should be the last plugin
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
