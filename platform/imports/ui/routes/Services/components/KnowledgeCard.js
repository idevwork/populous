import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const KnowledgeCard = ({title, children}) => (
  <StyledDiv>
    <div className="card-title">{title}</div>
    <div className="card-description">{children}</div>
  </StyledDiv>
)

const StyledDiv = styled.div`
  ${breakpoint('xs')`
    text-align: center;
    width: 100%;

    .card-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
      margin-bottom: 15px;
    }

    .card-description {
      font-size: 14px;
      text-align: left;
    }
  `}

  ${breakpoint('md')`
    text-align: center;
    width: 100%;

    .card-title {
      font-size: 24px;
      font-weight: bold;
      line-height: 25px;
      margin-bottom: 15px;
    }

    .card-description {
      font-size: 14px;
      text-align: left;
    }
  `}
`

export default KnowledgeCard
