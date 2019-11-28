import React from 'react';
import styled from 'styled-components';

const AskingCard = ({title, children}) => (
  <StyledDiv>
    <div className="card-title">{title}</div>
    <ul className="card-description">{children}</ul>
  </StyledDiv>
)

const StyledDiv = styled.div`
  text-align: center;
  width: 100%;

  .card-title {
    font-size: 24px;
    font-weight: bold;
    line-height: 25px;
    margin-bottom: 15px;
  }

  ul.card-description {
    font-size: 14px;
    text-align: left;

    li {
      list-style: circle;
      margin-bottom: 10px;
    }
  }
`

export default AskingCard
