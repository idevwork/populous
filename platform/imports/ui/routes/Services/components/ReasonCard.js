import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint'

const ReasonCard = ({title, children}) => (
  <StyledDiv>
    <div className="card-title">{title}</div>
    <div className="card-description">{children}</div>
  </StyledDiv>
)

const StyledDiv = styled.div`
  ${breakpoint('xs')`
    text-align: center;
    width: 100%;
    margin-bottom: 15px;

    .card-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
      margin-bottom: 12px;
    }

    .card-description {
      font-size: 12px;
    }
  `}

  ${breakpoint('md')`
    margin-bottom: 45px;    
  `}
`

export default ReasonCard
