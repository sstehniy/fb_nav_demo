import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledTooltip = styled.div`
  position: absolute;
  top: 63px;
  left: ${({ left, width }) => `calc(${left}px - ${width / 2}px)`};
  padding: 5px 13px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.bg_tooltip};
  color: ${({ theme }) => theme.bg_primary};
  border-radius: 7px;
  opacity: 0;
  animation: fadeIn 0.1s forwards 0.2s ease-in;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Tooltip = ({ text, leftStyleProp }) => {
  const [boxWidth, setBoxWidth] = useState(null);
  const ttRef = useRef(null);
  useEffect(() => {
    if (!ttRef.current) return;
    setBoxWidth(ttRef.current.offsetWidth);
  }, [ttRef.current]);

  return (
    <StyledTooltip left={leftStyleProp} width={boxWidth} ref={ttRef}>
      {text}
    </StyledTooltip>
  );
};

export default Tooltip;
