import React from 'react';
import styled from 'styled-components';
import { Card } from 'reactstrap';

// styled.tab is a function that returns a tab, assigning it to Tab creates a React
// component.
const Tab = styled.button.attrs({
  fontSize: props => props.size || '1em',
  type: props => `${props.type}` || 'button',
  disabled: props => !!props.disabled
})`
  position: relative;
  width: ${props => props.width || 'unset'};
  font-size: ${props => props.size || '1em'};
  background: #fff;
  color: #434445;
  cursor: pointer;
  padding: 0.5em 1.2em 0.5em 1.5em;
  border: 2px solid #e1e5eb;
  border-radius: 0px;
  text-transform: uppercase;
  font-family: 'PT Sans', sans-serif;
  letter-spacing: 1px;
  margin: 0 -1px;
  // Pseudo selectors work as well
  &:hover {
    border: ${props => `2px solid ${props.theme.colors.primary}`};
    background: ${props => props.theme.colors.primary};
    color: #fff;
  }
  &:disabled {
    background: #77adf2;
    color: #fff;
    cursor: not-allowed;
  }
  &.active {
    border: ${props => `2px solid ${props.theme.colors.primary}`};
    background: ${props => props.theme.colors.primary};
    color: #fff;
    > i {
      display: inline-block;
    }
  }
  i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(0, -50%);
    display: none;
  }
  @media(max-width: 479px) {
    font-size: 0.8em;
    padding: 0.5em 0.8em 0.5em 1.2em;
    letter-spacing: 0px;
    i {
      left: 5px;
    }
  }
`;

export const CustomTab = styled(Card)`
  box-shadow: 0 1px 15px 0 rgba(67, 68, 69, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: none;

  ul.nav {
    border-right: 2px solid ${props => props.theme.colors.paleGrey};
  }

  .nav-pills .nav-link {
    border-radius: 0;
    padding: 1.2rem 1.2rem;
    color: ${props => props.theme.colors.blue};
    font-family: 'PT Sans', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    border: 2px solid ${props => props.theme.colors.paleGrey};
    margin-bottom: -2px;
    border-right-width: 0px;
    border-left-width: 0px;
    background-color: rgba(41, 64, 94, 0.03);
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      color: ${props => props.theme.colors.blue};
    }

    @media(max-width: 575px) {
      font-size: 0.875rem;
      padding: 10px 16px;
      word-wrap: initial;
    }
  }

  .nav-pills .nav-link.active, .show > .nav-pills .nav-link {
    background-color: #fff;
    color: ${props => props.theme.colors.slateGrey};
    border-right-color: #fff;
    margin-right: -2px;
  }

  .nav-pills .nav-item:first-child .nav-link {
    border-top: none;
  }

  @media(min-width: 768px) {
    .nav-pills.list-group {
      min-height: 550px;
    }
  }
`;

export default Tab;
