import React from 'react';
import styled from 'styled-components';

const StyledSeparator = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.bg_primary};
  margin: 8px 0;
`;
const Separator = () => {
  return <StyledSeparator />;
};

export default Separator;
