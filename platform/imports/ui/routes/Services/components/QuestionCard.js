import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

class QuestionCard extends React.Component {
  render() {
    const { imgSrc, title, answers } = this.props

    return (
      <StyledDiv>
        {imgSrc && <img src={imgSrc} />}
        <div className="title">{title}</div>
        <div className="answer-wrapper">
          {
            answers.length > 1 ? answers.map((answer, index) => (
              <div key={index} className="answer">
                <span className="number">{index + 1}</span>
                <span>{answer}</span>
              </div>
            )) : answers[0] || ''
          }
        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  ${breakpoint('xs')`
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-bottom: 10px;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      max-width: 550px;
      margin-bottom: 18px;
    }

    .answer-wrapper {
      text-align: left;
      width: 100%;

      .answer {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        font-size: 12px;

        .number {
          background-color: #2E3A4D;
          color: white;
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }
      }
    }
  `}

  ${breakpoint('md')`
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 24px;
      font-weight: bold;
      max-width: 550px;
    }

    .answer-wrapper {
      text-align: left;
      width: 750px;

      .answer {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        font-size: 14px;

        .number {
          background-color: #2E3A4D;
          color: white;
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }
      }
    }
  `}
`

export default QuestionCard
