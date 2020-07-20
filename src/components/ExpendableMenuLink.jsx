import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ReactComponent as Arrow } from '../assets/next.svg';

const StyledExpendableMenuLink = styled.div`
  position: relative;
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

  & svg#arrow {
    position: absolute;
    right: 7px;
    width: 20px;
    height: 20px;
    stroke-width: 5px;
  }
`;
const ExpendableMenuLink = ({ data: { icon, name }, onClick }) => {
  return (
    <StyledExpendableMenuLink onClick={() => onClick(name)}>
      <div className='icon-wrapper'>{icon}</div>
      <div className='infos-wrapper'>
        <p id='title'>{name}</p>
      </div>
      <Arrow id='arrow' />
    </StyledExpendableMenuLink>
  );
};

ExpendableMenuLink.propTypes = {};

export default ExpendableMenuLink;
