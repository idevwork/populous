import { Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;primary
`;

export const ButtonLink = styled(Link)`
  /* Adapt the colours based on primary prop */
  display: inline-block;
  width: ${props => (props.width ? `calc(${props.width} - 6px)` : 'unset')};
  font-size: ${props => props.size || '1em'};
  background: ${props => (props.primary ? props.theme.colors.primary : '#fff')};
  color: ${props => (props.primary ? '#fff' : props.theme.colors.primary)};
  cursor: pointer;
  padding: ${props => (props.width ? '0.65em 0.8em' : '0.65em 1.2em')};
  margin: 2px 3px 0;
  border: ${props =>
    props.primary
      ? '1px solid transparent'
      : `1px solid ${props.theme.colors.primary}`};
  border-radius: 0px;
  text-transform: uppercase;
  text-decoration: none;
  font-family: 'PT Sans', sans-serif;
  letter-spacing: 1px;
  line-height: inherit;
  // Pseudo selectors work as well
  &:hover {
    background: ${props =>
      props.primary
        ? props.theme.colors.secondary
        : props.theme.colors.primary};
    color: #fff;
    text-decoration: none;
  }
`;

export const LinkedCard = styled(Card)`
margin-bottom: 8px;
padding: 15px;
border: none;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 8px 0 rgba(67,68,69,0.15);
  transition: box-shadow .2s linear;
    //	Pseudo selectors work as well
  &:hover {
      box-shadow: 0 1px 4px 0 rgba(63,119,191,0.30), 0 1px 20px 0 rgba(63,119,191,0.25);
  }
  @media (max-width: 768px){
  margin-bottom: 20px;
}
`;
