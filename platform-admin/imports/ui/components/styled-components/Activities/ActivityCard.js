import styled from 'styled-components';

export const MainText = styled.div`
font-size: 19px;
color: #434445;
white-space: nowrap;
margin-right: ${(props) => (props.withMargin ? '25px': 0)};

@media (max-width: 991px){
  font-size: 16px;
}
@media (max-width: 768px){
  display: block;
  margin-right: 0;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: left !important;
}
`;

