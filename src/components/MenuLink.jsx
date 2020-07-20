import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMenuLink = styled.div`
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

  & .infos-wrapper {
    & p#description {
      font-size: 12px;
    }
  }
`;
const MenuLink = ({ data: { name, description = '', icon } }) => {
  return (
    <StyledMenuLink>
      <div className='icon-wrapper'>{icon}</div>
      <div className='infos-wrapper'>
        <p id='title'>{name}</p>
        {description && <p id='description'>{description}</p>}
      </div>
    </StyledMenuLink>
  );
};

MenuLink.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.element.isRequired,
  }).isRequired,
};

export default MenuLink;
