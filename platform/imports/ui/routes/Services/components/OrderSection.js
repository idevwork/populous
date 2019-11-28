import React from 'react';
import styled from 'styled-components';

class OrderSection extends React.Component {
  render() {
    const { title, lists } = this.props
    return (
      <StyledDiv>
        <div class="title">{title}</div>
        <div class="content">
          {lists.map((list, index) => {
            return (
              <div key={index} class="paragraph">
                <b>{list.order} </b>
                <span>{list.subTitle}</span>
              </div>
            )
          })}
        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  .title {
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .content {
    .paragraph {
      margin-bottom: 20px;
    }
  }
`

export default OrderSection
