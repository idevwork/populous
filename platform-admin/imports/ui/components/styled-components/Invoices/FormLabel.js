import styled from 'styled-components';

export const FormLabel = styled.label`
  color: ${props => props.theme.colors.charcoalGrey};
  line-height: 1.2;
  text-transform: none !important;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  
  .check {
    width: 28px !important;
    height: 28px !important;
  }
`;