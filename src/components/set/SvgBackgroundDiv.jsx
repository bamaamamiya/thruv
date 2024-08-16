import React from 'react';
import styled from 'styled-components';

const SvgBackgroundDiv = styled.div`
  height: 10px;
  z-index: 1;
  width: 100%;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='10'><path d='M0,0 L10,10 L50,10 L40,0 L0,0' fill='rgb(229,12,6)'/><path d='M50,0 L60,10 L80,10 L70,0 L50,0' fill='rgb(255,238,88)'/></svg>");
  background-repeat: repeat-x;
`;

const App = () => {
  return <SvgBackgroundDiv />;
};

export default App;
