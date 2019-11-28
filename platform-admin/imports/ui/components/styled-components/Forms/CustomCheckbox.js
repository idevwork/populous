import styled from 'styled-components'
import {CustomCheckbox as CustomCheckboxComponent} from "../../../form-helpers/renderCheckbox";


export const CustomCheckbox = styled(CustomCheckboxComponent)`

input{
display: none;
}

.custom-checkbox{
display: flex;
align-items: center;
justify-content: center;
margin-right: 10px;
 border: solid 2px #e1e5eb;
 border-radius: 1px;
 width: 28px;
 min-width: 28px;
 height: 28px;
 min-height: 28px;
 background: #fff;
 
 &:after{
 margin-bottom: 2px;
content: '';
width: 8px;
height: 16px;
border-right: solid 3px #fff;
border-bottom: solid 3px #fff;
border-radius: 2px;
transform: rotate(45deg);
transform-origin: 50% 50%;
display: none;
}
}

input:checked + label .custom-checkbox{
border-color: ${(props) => props.theme.colors.primary};
background: ${(props) => props.theme.colors.primary};
&:after{
display: block;
}
}

label{
display: flex;
align-items: center;

margin: 0;
font-size: 16px;
color: #434445;

&:hover{
cursor: pointer;
}
}
`;