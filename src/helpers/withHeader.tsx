import React, {ReactElement} from 'react';
import Header from '../components/Header';

const withHeader = (Component: () => ReactElement) => {
  const ComponentWithHeader = () => (
    <>
      <Header />
      <Component />
    </>
  );
  return ComponentWithHeader;
};

export default withHeader;
