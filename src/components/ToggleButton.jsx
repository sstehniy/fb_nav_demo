import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { context } from '../context';

const StyledToggle = styled.div`
  height: 55px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg_sub};
  display: flex;
  align-items: center;
  padding: 0 7px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.bg_hover};
  }
  & .icon-wrapper {
    height: 36px;
    width: 36px;
    border-radius: 18px;
    background-color: ${({ theme }) => theme.bg_btn};
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
      width: 20px;
      height: 20px;
      fill: ${({ theme }) => theme.menu_link_svg};
    }
  }
`;
const Toggle = ({ data: { icon, name } }) => {
  return (
    <StyledToggle>
      <div className='icon-wrapper'>{icon}</div>
      <div className='infos-wrapper'>
        <p id='title'>{name}</p>
      </div>
      <ToggleButton />
    </StyledToggle>
  );
};

const StyledButton = styled.div`
  position: absolute;
  right: 20px;
  height: 28px;
  width: 52px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.bgc_toggle};
  transition: background-color 0.2s ease;

  & #toggle {
    height: 22px;
    width: 22px;
    margin: 3px;
    border-radius: 11px;
    transform: translateX(0);
    background-color: ${({ theme }) => theme.toggle};
    transition: background-color 0.2s ease, transform 0.2s ease-in;

    &.switched {
      transform: translateX(24px);
    }
  }
`;

const ToggleButton = () => {
  const { toggleColorModeHandler, colorMode } = useContext(context);
  return (
    <StyledButton onClick={toggleColorModeHandler}>
      <div
        id='toggle'
        className={colorMode === 'light' ? '' : 'switched'}></div>
    </StyledButton>
  );
};

Toggle.propTypes = {};

export default Toggle;
