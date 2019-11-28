import React from 'react';
import styled from 'styled-components';

export const H1 = styled.h1`
  color: ${props => (props.invert ? 'white' : props.theme.colors.naviBlue)};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  @media(min-width: 992px) {
    font-size: 2rem;
  }
`;

export const H2 = styled.h2`
  color: ${props => (props.invert ? 'white' : props.theme.colors.slateGrey)};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  @media(min-width: 992px) {
    font-size: 1.375rem;
  }
`;

export const H3 = styled.h3`
  color: ${props => (props.invert ? 'white' : props.theme.colors.coolGrey)};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  @media(min-width: 992px) {
    font-size: 1.25rem;
  }
`;

export const H4 = styled.h4`
  color: ${props => (props.invert ? 'white' : props.theme.colors.coolGrey)};
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
`;

export const Lead = styled.div`
  color: ${props => (props.invert ? 'white' : props.theme.colors.charcoalGrey)};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 16px;
  @media(min-width: 992px) {
    font-size: 1.11875rem;
  }
`;

export const P = styled.p`
  color: ${props => (props.invert
    ? 'white'
    : ( props.green
      ? props.theme.colors.green
      : ( props.cool
        ? props.theme.colors.coolGrey
        : (props.slate
          ? props.theme.colors.slateGrey
          : props.theme.colors.charcoalGrey
          )
        )
      )
    )};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  @media(min-width: 992px) {
    font-size: 1rem;
  }
`;

export const Small = styled.div`
  color: ${props => props.theme.colors.slateGrey};
  line-height: 1.2;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
`;

export const LABEL = styled.label`
  color: ${props => props.theme.colors.slateGrey};
  line-height: 1.2;
  text-transform: uppercase;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.75rem;
`;

export const Mute = styled.div`
  color: ${props => props.theme.colors.coolGrey};
  line-height: 1.2;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.75rem;
  @media(min-width: 992px) {
    font-size: 0.875rem;
  }
`;

export const Wrap = styled.p`
  color: ${props => (props.invert ? 'white' : props.theme.colors.charcoalGrey)};
  font-size: 1rem;
  font-weight: bold;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;

export const LinkText = styled.div`
  color: ${props => props.theme.colors.blue};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  @media(min-width: 992px) {
    font-size: 1rem;
  }

  &:hover {
    color: ${props => props.theme.colors.darkBlue};
  }
`;

export const NaviText = styled.div`
  color: ${props => (props.invert ? 'white' : props.theme.colors.naviBlue)};
  line-height: 1.5;
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 13px;
  @media(min-width: 992px) {
    font-size: 1.11875rem;
  }
`;

export const LabelText = styled.div`
  color: ${props => props.theme.colors.naviBlue};
  line-height: 1.2;
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  margin-bottom: 8px;
  @media(min-width: 992px) {
    font-size: 1.2725rem;
  }
`;

export const DangerText = styled.div`
  font-size: 16px;
  font-family: 'PT Sans', sans-serif;
  line-height: 1.5;
  color: ${props => props.theme.colors.red};
`;