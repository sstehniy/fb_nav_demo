import React, { useState, useContext, useMemo, useRef, useEffect } from 'react';
import { context } from '../context';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/fb-logo.svg';
import { ReactComponent as CreateIcon } from '../assets/plus.svg';
import { ReactComponent as MessengerIcon } from '../assets/facebook.svg';
import { ReactComponent as NotificationsIcon } from '../assets/bell.svg';
import { ReactComponent as MoreIcon } from '../assets/down-arrow.svg';
import { ReactComponent as PostIcon } from '../assets/edit.svg';
import { ReactComponent as StoryIcon } from '../assets/book.svg';
import { ReactComponent as EventIcon_1 } from '../assets/star.svg';
import { ReactComponent as PageIcon } from '../assets/success.svg';
import { ReactComponent as GroupIcon } from '../assets/team.svg';
import { ReactComponent as AdIcon } from '../assets/bullhorn.svg';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as HelpIcon } from '../assets/help.svg';
import { ReactComponent as MoonIcon } from '../assets/moon.svg';
import { ReactComponent as ReturnIcon } from '../assets/return.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';
import { ReactComponent as FeedBackIcon } from '../assets/risk.svg';

import SearchBar from '../components/Search';
import NavButton from '../components/UI/NavButton';
import TabMenu from '../components/TabMenu';

const StyledNavBar = styled.div`
  position: relative;
  padding-right: 15px;
  padding-left: 10px;
  top: 0;
  z-index: 1000;
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg_sub};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    height: 1px;
    background-color: ${({ theme }) => theme.bg_hover};
  }
`;

const NavBar = () => {
  return (
    <StyledNavBar>
      <LeftSection />
      {/* <MainSection /> */}
      <RightSection />
    </StyledNavBar>
  );
};

const StyledLSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & a {
    text-decoration: none;
    color: #fff;
    height: 50px;
    width: 50px;

    & svg {
      width: 50px;
      height: 50px;
    }
  }
`;

const LeftSection = () => {
  return (
    <StyledLSection>
      <a href='/'>
        <Logo />
      </a>
      <SearchBar />
    </StyledLSection>
  );
};

const StyledRSection = styled.div`
  height: 100%;
  width: 210px;
  display: flex;
  align-items: center;
  outline: none;

  & div:not(:last-child) {
    margin-right: 15px;
  }
`;

const RightSection = () => {
  const [activeTabName, setActiveTabName] = useState(null);

  const { toggleColorModeHandler } = useContext(context);
  const tabRef = useRef(null);

  const setactiveTabNameHandler = (tabName) => {
    if (tabName === activeTabName) setActiveTabName(null);
    else {
      setActiveTabName(null);
      setImmediate(() => setActiveTabName(tabName));
    }
  };
  useEffect(() => {
    if (!tabRef.current) return;
    const hideOnFocusOut = () => {
      setactiveTabNameHandler(null);
    };
    tabRef.current.addEventListener('focusout', hideOnFocusOut);
    return () => {
      tabRef.current.removeEventListener('focusout', hideOnFocusOut);
    };
  }, [tabRef.current]);

  const navbtns = useMemo(() => [
    {
      name: 'Create',
      icon: <CreateIcon />,
      children: [
        {
          type: 'link',
          name: 'Post',
          description: 'Share a post on News Feed',
          icon: <PostIcon />,
        },
        {
          type: 'link',
          name: 'Story',
          description: 'Share a photo or text to your story',
          icon: <StoryIcon />,
        },
        {
          type: 'link',
          name: 'Life Event',
          description: 'Add a life event to your profile',
          icon: <EventIcon_1 />,
        },
        {
          type: 'separator',
        },
        {
          type: 'link',
          name: 'Page',
          description: 'Connect and share with customers or fans',
          icon: <PageIcon />,
        },
        {
          type: 'link',
          name: 'Ad',
          description: 'Advertise your business, brand or organization',
          icon: <AdIcon />,
        },
        {
          type: 'link',
          name: 'Group',
          description: 'Connect with people who share your interests',
          icon: <GroupIcon />,
        },
        {
          type: 'link',
          name: 'Event',
          description: 'Bring people together with a public or private event',
          icon: <EventIcon_1 />,
        },
      ],
    },
    {
      name: 'Messenger',
      icon: <MessengerIcon />,
    },
    {
      name: 'Notifications',
      icon: <NotificationsIcon />,
    },
    {
      name: 'More',
      icon: <MoreIcon />,
      children: [
        {
          type: 'link',
          name: 'Give Feedback',
          description: 'Help us improve the new Facebook',
          icon: <FeedBackIcon />,
        },
        { type: 'separator' },
        {
          type: 'exp_link',
          name: 'Settings & Privacy',
          icon: <SettingsIcon />,
          children: [
            { type: 'link', name: 'Settings', icon: <SettingsIcon /> },
            { type: 'link', name: 'Privacy Checkup', icon: <SettingsIcon /> },
            {
              type: 'link',
              name: 'Privacy Shortcuts',
              icon: <SettingsIcon />,
            },
            { type: 'link', name: 'Activity Log', icon: <SettingsIcon /> },
            {
              type: 'link',
              name: 'News Feed Preferences',
              icon: <SettingsIcon />,
            },
            { type: 'link', name: 'Language', icon: <SettingsIcon /> },
          ],
        },
        {
          type: 'exp_link',
          name: 'Help & Support',
          icon: <HelpIcon />,
          children: [
            {
              type: 'link',
              name: 'Help Center',
              icon: <HelpIcon />,
            },
            { type: 'link', name: 'Help Community', icon: <HelpIcon /> },
            { type: 'link', name: 'Support Inbox', icon: <HelpIcon /> },
            { type: 'link', name: 'Report a Problem', icon: <HelpIcon /> },
          ],
        },
        {
          type: 'toggle',
          name: 'Dark Mode',
          icon: <MoonIcon />,
          onToggle: toggleColorModeHandler,
        },
        {
          type: 'link',
          name: 'Switch to classic Facebook',
          description: 'Go back to previous Facebook design at any time',
          icon: <ReturnIcon />,
        },
        {
          type: 'link',
          name: 'Log Out',
          icon: <LogoutIcon />,
        },
      ],
    },
  ]);

  return (
    <StyledRSection tabIndex={5} ref={tabRef}>
      {navbtns.map(({ name, icon }, i) => (
        <NavButton
          key={i}
          name={name}
          icon={icon}
          onClick={() => setactiveTabNameHandler(name)}
          classNames={name === activeTabName ? ['menu-btn-active'] : []}
        />
      ))}
      {activeTabName && (
        <TabMenu tabs={navbtns.find((b) => b.name === activeTabName)} />
      )}
    </StyledRSection>
  );
};

export default NavBar;
