import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const UnFocusedHome = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G data-name={1}>
      <Path d="M395.49 450H125.8a15 15 0 0 1-15-15V197a15 15 0 0 1 30 0v223h239.69V197a15 15 0 1 1 30 0v238a15 15 0 0 1-15 15Z" />
      <Path d="M445.11 261.65a15 15 0 0 1-10.61-4.39L260.64 83.4 86.78 257.26a15 15 0 0 1-21.21-21.21L250 51.58a15 15 0 0 1 21.21 0l184.51 184.47a15 15 0 0 1-10.61 25.6ZM304.15 450h-87a15 15 0 0 1-15-15V305.48a15 15 0 0 1 15-15h87a15 15 0 0 1 15 15V435a15 15 0 0 1-15 15Zm-72-30h57v-99.52h-57Z" />
    </G>
  </Svg>
);
export default UnFocusedHome;
