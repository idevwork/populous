import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint'
import { Button } from 'reactstrap'

const CustomButton = ({className, children, onClick}) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  ${breakpoint('xs')`
    background-color: transparent;
    font-size: 14px;
    border-radius: 50px;
    border: none;
    padding: 5px 15px;
    text-decoration: none;
    color: white;

    &.active {
      background-color: #42B6FB !important;
      font-weight: bold;
    }

    &:hover {
      background-color: #42B6FB !important;
      color: white !important;
      font-weight: bold;
      text-decoration: none;
    }
  `}

  ${breakpoint('md')`
    font-size: 18px;
    border-radius: 50px;
    padding: 8px 30px;
  `}
`

export default CustomButton
