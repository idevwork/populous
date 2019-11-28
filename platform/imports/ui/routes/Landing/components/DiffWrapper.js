import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Divider from './Divider'

export default DiffWrapper = ({
  children,
  className,
  bgColor,
  titleColor,
  titleSrc,
  title,
  ctxColor,
  zIndex
}) => {
  return (
    <StyledWrapper
      className={`diff-wrapper ${className}`}
      bgColor={bgColor}
      titleColor={titleColor}
      ctxColor={ctxColor}
      zIndex={zIndex}
    >
      <div className="main-container">
        <div className="title">
          <span className="title-img">
            <img src={titleSrc} />
          </span>
          <span>{title}</span>
        </div>
        <Divider color={ctxColor} className="underline" width="150" />
        <i className="description">{children}</i>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  ${breakpoint('xs')`
    background-color: ${props => props.bgColor};
    filter: drop-shadow(0 0 10px black);
    z-index: ${props => props.zIndex};
    position: relative;
    padding: 24px 20px;

    .main-container {
      overflow-x: hidden;
      .title {
        font-size: 18px;
        font-weight: bold;
        width: 100%;
        display: flex;
        align-items: center;
        color: ${props => props.titleColor};
        margin-bottom: 10px;
  
        .title-img {
          display: inherit;
          margin-right: 10px;
          width: 24px;
          height: 24px;

          img {
            width: 24px;
            height: 24px;
          }          
        }
      }

      .underline {
        margin-bottom: 10px;
      }
  
      .description {
        color: ${props => props.ctxColor};
        font-size: 14px;
      }
    }
  `}

  ${breakpoint('md')`
    padding: 50px 140px;

    .main-container {
      overflow-x: hidden;
      .title {
        font-size: 36px;
  
        .title-img {
          margin-right: 15px;
          width: 32px;
          height: 32px;

          img {
            width: 32px;
            height: 32px;
          }
        }
      }

      .underline {
        margin-bottom: 15px;
      }
  
      .description {
        font-size: 18px;
      }
    }
  `}
`
