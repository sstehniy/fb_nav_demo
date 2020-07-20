import { createContext } from 'react';

export const context = createContext({
  colorMode: '',
  toggleColorModeHandler: () => {},
});
