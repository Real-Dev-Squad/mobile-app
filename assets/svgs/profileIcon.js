import * as React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

const ProfileIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        enableBackground: 'new 0 0 24 24',
      }}
      viewBox="0 0 24 24"
      {...props}
    >
      <Ellipse cx={12} cy={8} rx={5} ry={6} />
      <Path d="M21.8 19.1c-.9-1.8-2.6-3.3-4.8-4.2-.6-.2-1.3-.2-1.8.1-1 .6-2 .9-3.2.9s-2.2-.3-3.2-.9c-.5-.2-1.2-.3-1.8 0-2.2.9-3.9 2.4-4.8 4.2-.7 1.3.4 2.8 1.9 2.8h15.8c1.5 0 2.6-1.5 1.9-2.9z" />
    </Svg>
  );
};
export default ProfileIcon;
