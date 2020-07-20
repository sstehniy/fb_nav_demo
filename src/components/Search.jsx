import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as BackIcon } from '../assets/back.svg';

const SearchWrapper = styled.div`
  margin-left: 3px;
  outline: none;
  & svg {
    width: 36px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const SearchButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  display: flex;
  position: relative;
  z-index: 3;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg_hover};
  & svg {
    width: 17px;
    height: 17px;
    fill: ${({ theme }) => theme.stroke};
  }
  cursor: pointer;
  transition: all 0.1s ease;

  &.collapsed {
    opacity: 0;
    transform: scaleX(0.3);
  }
`;

const SearchInput = styled.input`
  position: absolute;
  top: 0;
  padding-left: 40px;
  font-size: 0.93rem;
  left: 0;
  right: 0;
  z-index: 2;
  width: 240px;
  height: 40px;
  border-radius: 20px;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.stroke};
  background-color: ${({ theme }) => theme.bg_hover};

  &::placeholder {
    color: ${({ theme }) => theme.stroke};
  }

  &.opened {
    animation: openInput 0.2s forwards linear;
  }

  &.closed {
    animation: closeInput 0.2s forwards linear;
  }

  @keyframes openInput {
    from {
      padding-left: 40px;
      width: 240px;
      left: 0;
    }
    to {
      padding-left: 15px;
      width: 250px;
      left: -10px;
    }
  }

  @keyframes closeInput {
    from {
      padding-left: 15px;
      width: 250px;
      left: -10px;
    }
    to {
      padding-left: 40px;
      width: 240px;
      left: 0;
    }
  }
`;

const ExpendedInput = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 320px;
  min-height: 60px;
  user-select: none;
  border-radius: 0 0 8px 8px;
  outline: none;
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.bg_sub};
  animation: changeHeight 0.2s forwards linear;

  @keyframes changeHeight {
    from {
      min-height: 60px;
    }
    to {
      min-height: 105px;
    }
  }
`;

const BackButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 12px;
  left: 10px;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  transition: background-color 0.1s ease;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.bg_hover};
  }
  & svg {
    width: 17px;
    height: 17px;
    fill: ${({ theme }) => theme.stroke};
  }
`;

const ResultsList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & p {
    color: ${({ theme }) => theme.stroke};
  }
`;

const SearchBar = ({ results = [] }) => {
  const [expended, setExpend] = useState(false);
  const isWide = useMediaQuery({ query: '(min-width: 1260px)' });
  const toggleExpended = () => {
    setExpend(!expended);
  };

  return (
    <SearchWrapper>
      <InputWrapper>
        <SearchButton
          className={expended ? 'collapsed' : ''}
          onClick={toggleExpended}>
          <SearchIcon />
        </SearchButton>
        {(isWide || expended) && (
          <SearchInput
            placeholder='Search Facebook'
            className={expended ? 'opened' : 'closed'}
            onClick={toggleExpended}
          />
        )}
      </InputWrapper>
      {expended && (
        <ExpendedInput>
          <BackButton onClick={toggleExpended}>
            <BackIcon />
          </BackButton>
          <ResultsList>
            {results.length ? <p>result</p> : <p>No recent searches</p>}
          </ResultsList>
        </ExpendedInput>
      )}
    </SearchWrapper>
  );
};

export default SearchBar;
