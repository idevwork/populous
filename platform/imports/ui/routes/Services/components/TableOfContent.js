import React from 'react';
import styled from 'styled-components';

class TableOfContent extends React.Component {
  render() {
    const { title, contents } = this.props

    return (
      <StyledDiv>
        <div class="title">{title}</div>
        <div class="content-wrapper">
          {contents.map((content, index) => {
            return (
              <div class="wrapper" key={index}>
                <div class="sequence">{index + 1}</div>
                <div class="main-content">{content}</div>
              </div>
            )
          })}
        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   text-align: center;
   justify-content: center;
   align-items: center;

   .title {
     width: 100%;
     text-align: center;
     font-size: 14px;
     font-weight: bold;
     margin-bottom: 28px;
   }

   .content-wrapper {
     display: inline-block;

     .wrapper {
       display: flex;
       align-items: center;
       color: #2E3A4D;
       margin-bottom: 5px;

       .sequence {
         width: 30px;
         height: 30px;
         border-radius: 40px;
         border: solid 1px #2E3A4D;
         background-color: white;
         margin-right: 10px;
         display: flex;
         justify-content: center;
         align-items: center;
       }
     }
   }
`

export default TableOfContent
