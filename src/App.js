import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from './containers/NavBar';
import { context } from './context';
import { lightTheme, darkTheme } from './theme';

const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg_primary};
`;

function App() {
  const [colorMode, setColorMode] = useState('light');

  const toggleColorModeHandler = () => {
    if (colorMode === 'light') setColorMode('dark');
    else setColorMode('light');
  };

  const { Provider } = context;

  return (
    <Provider
      value={{
        colorMode,
        toggleColorModeHandler,
      }}>
      <ThemeProvider theme={colorMode === 'light' ? lightTheme : darkTheme}>
        <StyledApp>
          <NavBar />
        </StyledApp>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
