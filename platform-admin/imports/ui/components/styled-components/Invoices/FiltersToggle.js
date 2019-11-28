import styled from 'styled-components';
import {Button} from 'reactstrap';

export const FiltersToggle = styled.button`
position: fixed;
left: 0;
top: 150px;
width: 52px;
height: 52px;
border: none;
box-shadow: 0 1px 2px 0 rgba(0,0,0,.05),0 1px 10px 0 rgba(67,68,69,.25);
border-radius: 0;
font-size: 28px;
color: ${(props) => props.isActive ? '#5CA0F6' : '#fff'};
background: ${(props) => props.isActive ? '#fff' : '#5CA0F6'};
&, &:hover, &:active, &:focus{
outline: none;
}
&:hover{
cursor: pointer;
}

@media (max-width: 768px){
position: static;
width: 44px;
height: 44px;
}
`;