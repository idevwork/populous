import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint'

class InvoiceCard extends React.Component {
  render() {
    const { title, direction, imgSrc, children } = this.props

    return (
      <StyledDiv direction={direction}>
        <div className="content-wrapper">
          <div className="desktop-title">{title}</div>
          <div className="description">
            {children}
          </div>
        </div>

        <div className="img-wrapper">
          <div className="mobile-title">{title}</div>
          <img src={imgSrc} />
        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${breakpoint('xs')`
    flex-direction: column;
    
    .content-wrapper {
      flex-basis: 49.5%;

      .description {
        font-size: 14px;
      }
    }

    .img-wrapper {
      flex-basis: 49.5%;
      order: -1;

      img {
        width: 100%;
        height: 100%;
        margin-bottom: 10px;
        object-fit: cover;
      }
    }

    .desktop-title {
      display: none;
    }

    .mobile-title {
      font-size: 16px;
      font-weight: bold;
      line-height: 22px;
      margin-bottom: 10px;
      text-align: center;
    }
  `}

  ${breakpoint('md')`
    flex-direction: row;

    .content-wrapper {
      flex-basis: 49.5%;

      .description {
        font-size: 14px;
      }
    }

    .img-wrapper {
      flex-basis: 49.5%;
      order: ${props => props.direction == 'left' ? 1 : -1 };

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .desktop-title {
      display: block;
      font-size: 24px;
      line-height: 32px;
      font-weight: bold;
      margin-bottom: 6px;
    }

    .mobile-title {
      display: none;
    }
  `}
  
`

export default InvoiceCard
