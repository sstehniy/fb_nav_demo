import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Separator from './UI/Separator';
import MenuLink from './MenuLink';
import ExtandableMenuLink from './ExpendableMenuLink';
import ToggleButton from './ToggleButton';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { ReactComponent as BackIcon } from '../assets/back.svg';

const StyledTabMenu = styled.div`
  position: absolute;
  outline: none;
  width: 360px;
  padding: 10px 10px;
  top: calc(100% - 5px);
  overflow: hidden;
  right: 10px;
  color: ${({ theme }) => theme.stroke};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bg_sub};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  transition: height 0.15s ease;

  & .child {
    position: relative;
    & .child_header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 7px;
      & .back_btn {
        background-color: transparent;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 36px;
        border-radius: 18px;
        & svg {
          width: 16px;
          height: 16px;
          fill: ${({ theme }) => theme.back_btn_svg};
        }
        &:hover {
          background-color: ${({ theme }) => theme.bg_btn};
        }
      }
    }
  }

  .slide-out-enter {
    opacity: 0.3;
    transform: translateX(100px);
  }
  .slide-out-enter-active {
    opacity: 1;
    transform: translateX(0px);
    transition: all 0.15s ease;
  }
  .slide-out-exit {
    opacity: 1;
    transform: translateX(0px);
  }

  .slide-out-exit-active {
    opacity: 0.3;
    transform: translateX(100px);
    transition: all 0.15s ease;
  }

  .slide-in-enter {
    opacity: 0.3;
    transform: translateX(-100px);
  }
  .slide-in-enter-active {
    opacity: 1;
    transform: translateX(0px);
    transition: all 0.15s ease;
  }
  .slide-in-exit {
    opacity: 1;
    transform: translateX(0px);
  }

  .slide-in-exit-active {
    opacity: 0.3;
    transform: translateX(-100px);
    transition: all 0.3s ease-in;
  }
`;

const MenuTitle = styled.h2`
  letter-spacing: 1px;
`;

const TabMenu = ({ tabs: { name, children = [] } }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [menuHeight, setMenuHeight] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;
    setMenuHeight(menuRef.current.offsetHeight);
  }, [name, menuRef.current]);

  const setActiveSubMenuHandler = (name) => {
    setActiveSubMenu(name);
  };

  const changeManuHeight = useCallback((el) => {
    setMenuHeight(el.offsetHeight + 20);
  }, []);

  return (
    <StyledTabMenu
      ref={menuRef}
      style={{ height: menuHeight ? menuHeight : '' }}>
      <SwitchTransition>
        <CSSTransition
          key={activeSubMenu}
          timeout={100}
          onEntering={changeManuHeight}
          classNames={activeSubMenu ? 'slide-out' : 'slide-in'}>
          {activeSubMenu ? (
            <SubTabMenu
              name={activeSubMenu}
              links={children.find((c) => c.name === activeSubMenu).children}
              onReturn={() => setActiveSubMenuHandler(null)}
            />
          ) : (
            <MainTabMenu
              name={name}
              links={children}
              onSubMenuSelected={setActiveSubMenuHandler}
            />
          )}
        </CSSTransition>
      </SwitchTransition>
    </StyledTabMenu>
  );
};

const MainTabMenu = ({ name, links, onSubMenuSelected }) => {
  return (
    <div className='child'>
      <MenuTitle style={{ paddingLeft: '7px' }}>{name}</MenuTitle>
      {links.map((l, i) => {
        switch (l.type) {
          case 'link':
            return <MenuLink key={i} data={l} />;
          case 'exp_link':
            return (
              <ExtandableMenuLink
                key={i}
                data={l}
                onClick={onSubMenuSelected}
              />
            );
          case 'toggle':
            return <ToggleButton key={i} data={l} />;
          case 'separator':
            return <Separator key={i} />;
        }
      })}
    </div>
  );
};

const SubTabMenu = ({ name, links, onReturn }) => {
  return (
    <div className='child'>
      <div className='child_header'>
        <div onClick={onReturn} className='back_btn'>
          <BackIcon />
        </div>
        <MenuTitle>{name}</MenuTitle>
      </div>
      {links.map((l, i) => (
        <MenuLink key={i} data={l} />
      ))}
    </div>
  );
};

TabMenu.propTypes = {};

export default TabMenu;
