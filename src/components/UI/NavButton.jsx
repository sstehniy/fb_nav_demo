import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    fill: ${({ theme }) => theme.stroke};
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

const NavButton = ({ icon, onClick, classNames = [] }) => {
  return (
    <StyledNavButton onClick={onClick} className={classNames.join(' ')}>
      {icon}
    </StyledNavButton>
  );
};

NavButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  classNames: PropTypes.arrayOf(PropTypes.string),
};

export default NavButton;
