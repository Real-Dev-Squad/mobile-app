import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={16}
    height={16}
    style={{
      enableBackground: 'new 0 0 16 16',
    }}
    {...props}
  >
    <Path d="M15.45 7 14 5.551V2c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v.553L9 .555C8.727.297 8.477 0 8 0s-.727.297-1 .555L.55 7C.238 7.325 0 7.562 0 8c0 .563.432 1 1 1h1v6c0 .55.45 1 1 1h3v-5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v5h3c.55 0 1-.45 1-1V9h1c.568 0 1-.437 1-1 0-.438-.238-.675-.55-1z" />
  </Svg>
);
export default HomeIcon;
