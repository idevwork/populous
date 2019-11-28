import React from 'react';
import styled from 'styled-components';
import { Card as CardRS } from 'reactstrap'

//https://github.com/twbs/bootstrap/blob/v4-dev/dist/css/bootstrap.css#L4138
const Card = styled(CardRS)`
  border: none;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.05), 0 1px 6px 0 rgba(67,68,69,0.10);
`;

export default Card;
