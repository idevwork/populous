import styled from 'styled-components';

export const Wrapper = styled.div`
  input[type=checkbox]:checked + label .check {
    background: ${props => props.theme.colors.red};
    border: 1px solid ${props => props.theme.colors.red};
  }
  input[type=checkbox]:checked + label .checkbox-accept {
    background: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
  }
  
  input + label .check:after {
    font-size: 38px;
    color: ${props => props.theme.newColors.lightGray};
    display: block;
    margin-top: -11px;
    border: none;
    transform: none;
  }
  input + label .checkbox-accept:after {
    margin: 3px 9px 0px 9px;
    content: '';
    width: 8px;
    height: 16px;
    border-right: solid 3px ${props => props.theme.newColors.lightGray};
    border-bottom: solid 3px ${props => props.theme.newColors.lightGray};
    border-radius: 2px;
    transform: rotate(45deg);
    transform-origin: 50% 50%;
  }
  input + label .checkbox-reject:after {
    content: '×';
  }
  
  input[type=checkbox]:checked + label .check:after {
    content: '×';
    font-size: 38px;
    color: ${props => props.theme.colors.white};
    display: block;
    margin-top: -10px;
    margin-left: 3px;
    border: none;
    transform: none;
  }
  
  input[type=checkbox]:checked + label .check:after {
    content: '×';
    color: ${props => props.theme.colors.white};
  }
  input[type=checkbox]:checked + label .checkbox-accept:after {
    margin: 4px 9px 0px 9px;
    content: '';
    width: 8px;
    height: 16px;
    border-right: solid 3px ${props => props.theme.colors.white};
    border-bottom: solid 3px ${props => props.theme.colors.white};
    border-radius: 2px;
    transform: rotate(45deg);
    transform-origin: 50% 50%;
  }
`;