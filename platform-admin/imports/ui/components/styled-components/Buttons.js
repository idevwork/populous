import styled from 'styled-components';
import PropTypes from 'prop-types';

const BaseButton = styled.button`
  display: ${(props) => props.block ? 'block' : false};
  width: ${(props) => props.block ? '100%' : false};
  margin-bottom: 0.5rem;
  padding: ${props => props.sm ? '8px 16px' : (props.md ? '13px 21.5px' : '16px 32px')};
  border-width: 2px;
  border-radius: 1px;
  transition: all .2s linear;
  text-transform: uppercase;
  font-size: ${props => props.sm ? '12px' : (props.md ? '14px' : '16px')};
  font-weight: 700;
  line-height: 1;
  box-shadow: ${(props) => props.theme.button.boxShadow};
  &, &:active {
    border-style: solid;
  }
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &[disabled] {
    &, &:hover, &:focus {
      box-shadow: none;
      cursor: not-allowed;
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.paleGrey};
      color: ${(props) => props.outline ? props.theme.colors.paleGrey : props.theme.colors.white};
      border-color: ${(props) => props.theme.colors.paleGrey};
    }
  }

  @media(max-width: 991px) {
    padding: ${props => props.sm ? '8px 16px' : (props.md ? '10px 16px' : '14px 25px')};
    font-size: ${props => props.sm ? '12px' : (props.md ? '14px' : '14px')};
  }

  & + button {
    margin-left: 0.6rem;
  }
`;

BaseButton.propTypes = {
  block: PropTypes.bool,
  outline: PropTypes.bool,
  lg: PropTypes.bool,
  md: PropTypes.bool,
  sm: PropTypes.bool,
};

const DefaultButton = styled(BaseButton)`
  &:not([disabled]) {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.coolGrey};
    border-color: ${(props) => props.theme.colors.coolGrey};
    &:hover {
      background: transparent;
      color: ${(props) => props.theme.colors.coolGrey};
      border-color: ${(props) => props.theme.colors.coolGrey};
    }
  }
`;

export const LinkButton = styled(BaseButton)`
  display: inline-block;
  background: none;
  color: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.blue};

  &, &:focus {
    box-shadow: none;
  }
  &:hover {
    color: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.darkBlue};
  }
  &, &[disabled] {
    &, &:hover{
      border-color: transparent;
    }
  }
  &[disabled] {
    &, &:hover, &:focus{
      background: none;
      color: ${(props) => props.outline ? props.theme.colors.grey : props.theme.colors.darkBlue};
    }
  }
`;

export const PrimaryButton = styled(BaseButton)`
  &:not([disabled]) {
    background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue};
    color: ${(props) => props.outline ? props.theme.colors.blue : props.theme.colors.white};
    &:hover {
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.darkBlue};
      border-color: ${(props) => props.theme.colors.darkBlue};
      color: ${(props) => props.outline ? props.theme.colors.darkBlue : props.theme.colors.white};
    }
  }
`;

export const SuccessButton = styled(BaseButton)`
  &:not([disabled]) {
    background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.green};
    border-color: ${(props) => props.theme.colors.green};
    color: ${(props) => props.outline ? props.theme.colors.green : props.theme.colors.white};
    &:hover{
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.darkGreen};
      border-color: ${(props) => props.theme.colors.darkGreen};
      color: ${(props) => props.outline ? props.theme.colors.darkGreen : props.theme.colors.white};
    }
  }
`;

export const DangerButton = styled(BaseButton)`
  &:not([disabled]) {
    background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.red};
    border-color: ${(props) => props.theme.colors.red};
    color: ${(props) => props.outline ? props.theme.colors.red : props.theme.colors.white};
    &:hover{
      background: ${(props) => props.outline ? props.theme.colors.white : props.theme.colors.red};
      border-color: ${(props) => props.theme.colors.red};
      color: ${(props) => props.outline ? props.theme.colors.red : props.theme.colors.white};
    }
  }
`;

export default DefaultButton;
