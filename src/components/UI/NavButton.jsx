import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tooltip from '../../components/UI/Tooltip';

const StyledNavButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg_hover};
  transition: background-color 0.1s ease;
  cursor: pointer;
  flex-shrink: 0;

  & svg {
    width: 15px;
    height: 15px;
    fill: ${({ theme }) => theme.svg_fill};
  }

  &:hover {
    background-color: ${({ theme }) => theme.bg_btn};
  }

  &.menu-btn-active {
    background-color: ${({ theme }) => theme.bg_btn_active};
    animation: buttonPop 0.07s forwards linear;
  }

  &.menu-btn-active svg {
    fill: ${({ theme }) => theme.active_svg_fill};
  }

  @keyframes buttonPop {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(0.9, 0.9);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

const NavButton = ({ icon, name, onClick, classNames = [] }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [leftStyleProp, setLeftStyleProp] = useState(null);

  const btnRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current) return;

    const resetShowTooltip = () => {
      setShowTooltip(false);
      setLeftStyleProp(null);
    };

    const showTooltipHandler = () => {
      if (showTooltip) return;
      setLeftStyleProp(
        btnRef.current.offsetLeft + btnRef.current.offsetWidth / 2
      );
      setShowTooltip(true);
    };

    btnRef.current.addEventListener('mouseover', showTooltipHandler);
    btnRef.current.addEventListener('mouseleave', resetShowTooltip);
    btnRef.current.addEventListener('click', resetShowTooltip);

    return () => {
      btnRef.current.removeEventListener('mouseover', showTooltipHandler);
      btnRef.current.removeEventListener('mouseleave', resetShowTooltip);
      btnRef.current.removeEventListener('click', resetShowTooltip);
    };
  }, [btnRef.current]);

  return (
    <>
      <StyledNavButton
        onClick={onClick}
        className={classNames.join(' ')}
        ref={btnRef}>
        {icon}
      </StyledNavButton>
      {showTooltip && <Tooltip text={name} leftStyleProp={leftStyleProp} />}
    </>
  );
};

NavButton.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classNames: PropTypes.arrayOf(PropTypes.string),
};

export default NavButton;
